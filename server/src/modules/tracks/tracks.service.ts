import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { tracksServiceErrorMessages } from './tracks.constants';
import { TrackEntity } from './track.entity';
import { AuthorsService } from '../authors/authors.service';
import { ErrorMessagesEnum } from 'src/common/enums';

@Injectable()
export class TracksService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackEntityRepository: Repository<TrackEntity>,
    private readonly authorsService: AuthorsService,
  ) {
    super(trackEntityRepository, tracksServiceErrorMessages);
  }

  async findOne(
    conditions: FindOptionsWhere<TrackEntity>,
    options?: FindOneOptions<TrackEntity>,
  ): Promise<TrackEntity> {
    const trackEntity = await super.findOne(conditions, options);
    await this.assignAuthor(trackEntity);
    return trackEntity;
  }

  async findAll(
    options?: FindManyOptions<TrackEntity>,
  ): Promise<TrackEntity[]> {
    const tracks = await super.findAll(options);
    for (const track of tracks) {
      await this.assignAuthor(track);
    }

    return tracks;
  }

  async createOne(entity: Partial<TrackEntity>): Promise<TrackEntity> {
    const { authorId } = entity;
    console.log(authorId);
    if (authorId) {
      await this.authorsService.findOne({ id: authorId });
    }

    return super.createOne(entity);
  }

  async updateOne(
    conditions: FindOptionsWhere<TrackEntity>,
    entity: Partial<TrackEntity>,
  ): Promise<TrackEntity> {
    const { authorId } = entity;
    if (authorId) {
      await this.authorsService.findOne({ id: authorId });
    }

    return super.updateOne(conditions, entity);
  }

  private async assignAuthor(track: TrackEntity) {
    const authorId = track.authorId;
    const author = authorId
      ? await this.authorsService.findOne({ id: authorId })
      : null;

    track.author = author;
  }

  public async updateMany(
    conditions: FindOptionsWhere<TrackEntity>,
    dataToUpdate: Partial<TrackEntity>,
  ): Promise<void> {
    await this.trackEntityRepository
      .update(conditions, dataToUpdate)
      .catch(() => {
        throw new BadRequestException(ErrorMessagesEnum.INVALID_DATA);
      });
  }
}
