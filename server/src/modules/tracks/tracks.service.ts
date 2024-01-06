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
import { randomUUID } from 'crypto';
import * as path from 'path';
import { FilesService } from '../files/files.service';
import { FileEntity } from '../files/file.entity';
import {
  STORAGE_ROOT_DIRECTORY,
  TRACKS_IMAGES_DIRECTORY,
} from 'src/systems/storage/storage.constants';
import { IMultipartFile } from 'src/systems/storage/interfaces';
import { ErrorMessagesEnum } from 'src/common/enums';


@Injectable()
export class TracksService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackEntityRepository: Repository<TrackEntity>,
    private readonly authorsService: AuthorsService,
    private readonly filesService: FilesService,
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

  async createOne(
    entity: Partial<TrackEntity>,
    file?: Partial<FileEntity>,
  ): Promise<TrackEntity> {
    console.log(entity);
    const trackId = randomUUID();
    const fileId = randomUUID();
    const fileEntity = file ? { id: fileId } : null;

    if (file) {
      const filePath = path.join(
        STORAGE_ROOT_DIRECTORY,
        TRACKS_IMAGES_DIRECTORY,
        trackId,
      );

      await this.filesService.createOne(
        file as IMultipartFile,
        { id: fileId },
        filePath,
      );
    }

    const { authorId } = entity;
    console.log(authorId);
    if (authorId) {
      await this.authorsService.findOne({ id: authorId });
    }

    console.log('\n\nFile entity: ', fileEntity, '\n\n');
    return super.createOne({ ...entity, id: trackId, image: fileEntity });
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
