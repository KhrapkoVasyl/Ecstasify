import { Module } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { AuthorsModule } from '../authors';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AuthorsModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
