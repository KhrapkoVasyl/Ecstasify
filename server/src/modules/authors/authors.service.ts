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
import { DbFilesService } from '../db-files/db-files.service';
import { DbFileEntity } from '../db-files/db-file.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorEntity>,
    private readonly deletedAuthorsPublisher: DeletedAuthorsPublisher,
    private readonly dbFilesService: DbFilesService,
  ) {}

  async createOne(author: Partial<AuthorEntity>, file?: Partial<DbFileEntity>) {
    const authorCoverId = file
      ? await this.dbFilesService.createOne(file).then(({ id }) => id)
      : undefined;

    const newAuthor = new this.authorModel({
      ...author,
      imageId: authorCoverId,
    });

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

    for (const author of authorData) {
      await this.assignImage(author);
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
    await this.assignImage(existingAuthor);
    return existingAuthor;
  }

  private async assignImage(author: Partial<AuthorEntity>) {
    const imageId = author.imageId;
    const imageFile = imageId
      ? await this.dbFilesService.findOne({ id: imageId })
      : null;

    if (imageFile) {
      const dataBuffer = Buffer.from(imageFile.data?.buffer);
      imageFile.base64 = dataBuffer.toString('base64');
      delete imageFile.data;
    }

    author.imageFile = imageFile;
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
