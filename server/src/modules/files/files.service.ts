import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOptionsWhere,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { FileEntity } from './file.entity';
import { StorageService } from 'src/systems/storage/storage.service';
import { IMultipartFile } from 'src/systems/storage/interfaces';
import { STORAGE_ROOT_DIRECTORY } from 'src/systems/storage/storage.constants';
import { filesServiceErrorMessages } from './files.constants';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  async createOne(
    file: IMultipartFile,
    data?: Partial<FileEntity>,
    pathToFile = STORAGE_ROOT_DIRECTORY,
  ) {
    const uploadedFileEntity = await this.storageService.createOne(
      file,
      pathToFile,
    );
    const entityLike = this.fileEntityRepository.create(uploadedFileEntity);
    const entityToCreate = this.fileEntityRepository.merge(entityLike, data);
    const { id } = await this.fileEntityRepository
      .save(entityToCreate)
      .catch(() => {
        throw new BadRequestException(filesServiceErrorMessages.invalidData);
      });
    return this.findOne({ id });
  }

  findOne(
    conditions: FindOptionsWhere<FileEntity>,
    options: FindOneOptions<FileEntity> = { loadEagerRelations: true },
  ): Promise<FileEntity> {
    return this.fileEntityRepository
      .findOneOrFail({
        ...options,
        where: conditions,
      })
      .catch(() => {
        throw new NotFoundException(filesServiceErrorMessages.entityNotFound);
      });
  }

  findAll(
    options: FindManyOptions<FileEntity> = { loadEagerRelations: true },
  ): Promise<FileEntity[]> {
    return this.fileEntityRepository.find(options).catch(() => {
      throw new NotFoundException(filesServiceErrorMessages.entitiesNotFound);
    });
  }

  async deleteOne(
    conditions: FindOptionsWhere<FileEntity>,
  ): Promise<FileEntity> {
    const entity = await this.findOne(conditions);
    await this.storageService.deleteOne(entity.filePath);
    return this.fileEntityRepository.remove(entity).catch(() => {
      throw new NotFoundException(filesServiceErrorMessages.entityNotFound);
    });
  }
}
