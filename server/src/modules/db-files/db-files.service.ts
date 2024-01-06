import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DbFile, DbFileDocument } from './db-file.schema';
import { IdDto } from 'src/common/dto';

@Injectable()
export class DbFilesService {
  private allowedExtensions = ['jpeg', 'png', 'gif'];

  constructor(
    @InjectModel(DbFile.name)
    private readonly dbFileModel: Model<DbFileDocument>,
  ) {}

  async saveFileToDB(file) {
    this.checkFileMimetype(file.mimetype);

    const dbFile = new this.dbFileModel(file);
    await dbFile.save();

    return this.findOne(dbFile.id);
  }

  checkFileMimetype(mimetype: string) {
    const subtype = mimetype.split('/').at(-1);

    if (!this.allowedExtensions.includes(subtype)) {
      throw new HttpException(
        'Unsupported media type. Only .jpeg, .png, .gif files are allowed.',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
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
