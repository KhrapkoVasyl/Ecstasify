import { Module } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TracksModule {}
