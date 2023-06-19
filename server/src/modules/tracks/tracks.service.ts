import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { tracksServiceErrorMessages } from './tracks.constants';
import { TrackEntity } from './track.entity';

@Injectable()
export class TracksService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackEntityRepository: Repository<TrackEntity>,
  ) {
    super(trackEntityRepository, tracksServiceErrorMessages);
  }
}
