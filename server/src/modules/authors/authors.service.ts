import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessagesEnum } from 'src/common/enums';
import { AuthorEntity } from './author.schema';
import { FindAllAuthorOptionsDto } from './dto';
import { IdDto } from 'src/common/dto';
import { DeletedAuthorsPublisher } from './deleted-authors.publisher';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorEntity>,
    private readonly deletedAuthorsPublisher: DeletedAuthorsPublisher,
  ) {}

  async createOne(author: Partial<AuthorEntity>) {
    const newAuthor = new this.authorModel({ ...author });
    await newAuthor.save().catch(() => {
      throw new ConflictException(ErrorMessagesEnum.AUTHOR_ALREADY_EXISTS);
    });

    return this.findOne({ id: newAuthor.id });
  }

  async updateOne(conditions: IdDto, author: Partial<AuthorEntity>) {
    const existingAuthor = await this.authorModel
      .findOneAndUpdate(conditions, author, {
        new: true,
      })
      .lean()
      .catch(() => {
        throw new BadRequestException(ErrorMessagesEnum.INVALID_DATA);
      });
    if (!existingAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }
    return existingAuthor;
  }

  async findAll(
    options: FindAllAuthorOptionsDto,
  ): Promise<Partial<AuthorEntity>[]> {
    let authorData: Partial<AuthorEntity>[];

    const name = options?.name;

    if (name) {
      const regex = new RegExp('.*' + name + '.*', 'i');
      authorData = await this.authorModel
        .find({ name: { $regex: regex } })
        .lean()
        .exec();
    } else {
      authorData = await this.authorModel.find().lean().exec();
    }

    if (!authorData) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHORS_NOT_FOUND);
    }

    return authorData;
  }

  async findOne(conditions: IdDto): Promise<AuthorEntity> {
    const existingAuthor = await this.authorModel
      .findOne(conditions)
      .lean()
      .exec();
    if (!existingAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }
    return existingAuthor;
  }

  async deleteOne(conditions: IdDto) {
    const deletedAuthor = await this.authorModel
      .findOneAndDelete(conditions)
      .lean()
      .catch(() => {
        throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
      });
    if (!deletedAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }

    this.deletedAuthorsPublisher.publish(deletedAuthor.id);

    return deletedAuthor;
  }
}
