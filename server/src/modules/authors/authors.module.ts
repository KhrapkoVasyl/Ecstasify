import { Module } from '@nestjs/common';
import { AuthorEntity } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
})
export class AuthorsModule {}
