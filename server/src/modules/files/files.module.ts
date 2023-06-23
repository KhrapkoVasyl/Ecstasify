import { Module } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { StorageModule } from 'src/systems/storage';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
