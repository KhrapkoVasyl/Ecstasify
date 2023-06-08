import { Module } from '@nestjs/common';
import { PlaylistEntity } from './playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
})
export class PlaylistsModule {}
