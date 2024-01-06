import { Module } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { AuthorsModule } from '../authors';
import { FilesModule } from '../files';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    AuthorsModule,
    FilesModule,
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
