import { Module } from '@nestjs/common';
import { PlaylistEntity } from './playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [TracksModule, TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
