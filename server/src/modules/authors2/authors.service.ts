import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessagesEnum } from 'src/common/enums';
import { AuthorEntity } from './author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel('Author') private authorModel: Model<AuthorEntity>,
  ) {}

  async createOne(author) {
    const newAuthor = await new this.authorModel(author);
    await newAuthor.save().catch(() => {
      throw new BadRequestException(ErrorMessagesEnum.AUTHOR_ALREADY_EXISTS);
    });
    return this.authorModel
      .findOne({
        name: author.name,
      })
      .lean()
      .exec();
  }

  async updateOne(authorId: string, author) {
    const existingAuthor = await this.authorModel
      .findOneAndUpdate({ id: authorId }, author, {
        new: true,
      })
      .lean();
    if (!existingAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }
    return existingAuthor;
  }

  async findAll(name?: string) {
    let authorData;

    if (name) {
      const regex = new RegExp('.*' + name + '.*', 'i');
      authorData = await this.authorModel
        .find({ name: { $regex: regex } })
        .lean()
        .exec();
    } else {
      authorData = await this.authorModel.find().lean().exec();
    }

    if (!authorData || authorData.length === 0) {
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
      .lean();
    if (!deletedAuthor) {
      throw new NotFoundException(ErrorMessagesEnum.AUTHOR_NOT_FOUND);
    }

    return deletedAuthor;
  }
}
