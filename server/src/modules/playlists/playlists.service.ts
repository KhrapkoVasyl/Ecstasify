import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository, FindOptionsWhere } from 'typeorm';
import { playlistsServiceErrorMessages } from './playlists.constants';
import { PlaylistEntity } from './playlist.entity';
import { TracksService } from '../tracks/tracks.service';
import { TrackEntity } from '../tracks/track.entity';

@Injectable()
export class PlaylistsService extends BaseService<PlaylistEntity> {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistEntityRepository: Repository<PlaylistEntity>,
    private readonly trackService: TracksService,
  ) {
    super(playlistEntityRepository, playlistsServiceErrorMessages);
  }

  async addTrackToPlaylist(
    playlist: FindOptionsWhere<PlaylistEntity>,
    track: FindOptionsWhere<TrackEntity>,
  ) {
    const playlistEntity = await this.findOne(playlist, {
      relations: { tracks: true },
      select: { tracks: { id: true } },
    });

    const trackEntity = await this.trackService.findOne(track);

    const trackInPlaylist = playlistEntity.tracks.find(
      (track) => track.id === trackEntity.id,
    );
    if (trackInPlaylist) {
      throw new ConflictException(
        playlistsServiceErrorMessages.trackAlreadyInPlaylist,
      );
    }

    return this.updateOne(
      { id: playlist.id },
      { tracks: [...playlistEntity.tracks, { id: trackEntity.id }] },
    );
  }
}
