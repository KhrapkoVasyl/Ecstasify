import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as uuid from 'uuid';
import { DbFileEntity } from '../db-files/db-file.schema';

@Schema({ collection: 'authors', timestamps: true })
export class AuthorEntity {
  @ApiProperty({ type: 'string', maxLength: 36, uniqueItems: true })
  @Prop({
    type: MongooseSchema.Types.String,
    maxlength: 36,
    unique: true,
    default: () => uuid.v4(),
  })
  id: string;

  @ApiProperty({ type: 'string', maxLength: 32, uniqueItems: true })
  @Prop({ type: MongooseSchema.Types.String, maxlength: 32, unique: true })
  name: string;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', readOnly: true, format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', maxLength: 36, nullable: true })
  @Prop({ type: MongooseSchema.Types.String, maxlength: 36, required: false })
  imageId: string;

  @ApiHideProperty()
  imageFile?: Partial<DbFileEntity>;
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity);
