import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DbFileEntity, DbFileDocument } from './db-file.schema';
import { IdDto } from 'src/common/dto';
import { ErrorMessagesEnum } from 'src/common/enums';

@Injectable()
export class DbFilesService {
  constructor(
    @InjectModel(DbFileEntity.name)
    private readonly dbFileModel: Model<DbFileDocument>,
  ) {}

  async createOne(entity: Partial<DbFileEntity>) {
    const { data } = entity;
    const newAuthor = new this.dbFileModel(entity);
    await newAuthor.save().catch(() => {
      throw new BadRequestException(ErrorMessagesEnum.INVALID_DATA);
    });

    return this.findOne({ id: newAuthor.id });
  }

  findAll() {
    return this.dbFileModel.find().lean().exec();
  }

  findOne(iconditions: IdDto) {
    return this.dbFileModel.findOne(iconditions).lean().exec();
  }

  async deleteOne(conditions: IdDto) {
    return this.dbFileModel.findOneAndDelete(conditions).lean();
  }
}
