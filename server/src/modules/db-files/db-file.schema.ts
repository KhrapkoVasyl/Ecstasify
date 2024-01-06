import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as uuid from 'uuid';

export type DbFileDocument = DbFileEntity & Document;

@Schema({ collection: 'dbFiles', timestamps: true })
export class DbFileEntity {
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

  @ApiProperty({ type: 'blob', required: true })
  @Prop({ type: Buffer })
  data: Buffer;

  @ApiHideProperty()
  base64: string;

  @ApiProperty({ readOnly: true })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DbFileSchema = SchemaFactory.createForClass(DbFileEntity);
