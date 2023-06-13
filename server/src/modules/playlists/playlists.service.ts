import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { playlistsServiceErrorMessages } from './playlists.constants';
import { PlaylistEntity } from './playlist.entity';

@Injectable()
export class PlaylistsService extends BaseService<PlaylistEntity> {
  constructor(
    @InjectRepository(PlaylistEntity)
    playlistEntityRepository: Repository<PlaylistEntity>,
  ) {
    super(playlistEntityRepository, playlistsServiceErrorMessages);
  }
}
