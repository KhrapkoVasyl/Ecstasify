import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessagesEnum } from 'src/common/enums';
import { AuthorEntity } from './author.schema';
import { FindAllAuthorOptionsDto } from './dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorEntity>,
  ) {}

  async createOne(author) {
    const newAuthor = new this.authorModel(author);
    await newAuthor.save().catch(() => {
      throw new BadRequestException(ErrorMessagesEnum.INVALID_DATA);
    });

    return this.findOne(newAuthor.id);
  }

  async updateOne(authorId: string, author) {
    const existingAuthor = await this.authorModel
      .findOneAndUpdate({ id: authorId }, author, {
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

  async findAll(options: FindAllAuthorOptionsDto) {
    let authorData;

    if (options?.name) {
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

  async findOne(authorId: string) {
    const existingAuthor = await this.authorModel
      .findOne({
        id: authorId,
      })
      .lean()
      .exec();
    if (!existingAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }
    return existingAuthor;
  }

  async deleteOne(authorId: string) {
    const deletedAuthor = await this.authorModel
      .findOneAndDelete({
        id: authorId,
      })
      .lean()
      .catch(() => {
        throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
      });
    if (!deletedAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }

    return deletedAuthor;
  }
}
