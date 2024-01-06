import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbFileEntity, DbFileSchema } from './db-file.schema';
import { DbFilesService } from './db-files.service';
import { DbFilesController } from './db-files.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DbFileEntity.name,
        schema: DbFileSchema,
      },
    ]),
  ],
  providers: [DbFilesService],
  exports: [DbFilesService],
  controllers: [DbFilesController],
})
export class DbFilesModule {}
