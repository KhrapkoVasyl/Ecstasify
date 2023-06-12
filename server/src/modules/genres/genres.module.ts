import { Module } from '@nestjs/common';
import { GenreEntity } from './genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
})
export class GenresModule {}
