import { ApiProperty } from '@nestjs/swagger';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import * as uuid from 'uuid';

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
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorEntity);
