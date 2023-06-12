import { Module } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
})
export class FilesModule {}
