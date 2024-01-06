import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as uuid from 'uuid';

export type DbFileDocument = DbFile & Document;

@Schema()
export class DbFile {
  @ApiProperty({ type: 'string', maxLength: 36, uniqueItems: true })
  @Prop({
    type: MongooseSchema.Types.String,
    maxlength: 36,
    unique: true,
    default: () => uuid.v4(),
  })
  id: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Prop({ type: String, required: true, maxlength: 256 })
  fileName: string;

  @ApiProperty({ type: 'string', maxLength: 256, required: true })
  @Prop({ type: String, required: true, maxlength: 256 })
  mimetype: string;

  @ApiProperty({ readOnly: true })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DbFileSchema = SchemaFactory.createForClass(DbFile);
