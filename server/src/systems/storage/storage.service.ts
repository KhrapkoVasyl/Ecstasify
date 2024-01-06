import {
  BlobDeleteResponse,
  BlobServiceClient,
  BlobUploadCommonResponse,
  BlockBlobParallelUploadOptions,
} from '@azure/storage-blob';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { join, parse } from 'node:path';
import { IMultipartFile, IStorageConfiguration } from './interfaces';
import { STORAGE_DEFAULT_UPLOAD_OPTIONS } from './storage.constants';
import { FileEntity } from 'src/modules/files/file.entity';
import { ErrorMessagesEnum } from 'src/common/enums';
import { imagesMimetypes } from 'src/common/constants';

@Injectable()
export class StorageService {
  private readonly client: BlobServiceClient;
  private readonly blobContainerName: string;

  constructor(
    @Inject('STORAGE_CONFIG') storageConfig: IStorageConfiguration,
    @Inject('CONTAINER_NAME') containerName: string,
  ) {
    this.client = BlobServiceClient.fromConnectionString(
      storageConfig.connectionString,
    );

    this.blobContainerName = containerName;
  }

  async createOne(
    file: IMultipartFile,
    pathToFile: string,
    options?: BlockBlobParallelUploadOptions,
  ): Promise<Partial<FileEntity>> {
    const { filename, mimetype } = file;

    const uploadOptions = options ?? {
      blobHTTPHeaders: { blobContentType: mimetype },
    };

    const { name, ext } = parse(filename);
    const filePath = join(pathToFile, filename).replace(/\\/g, '/');

    const isImage = imagesMimetypes.includes(file?.mimetype);
    // если картинка - обрезать квадратом

    await this.uploadOne(file, filePath, uploadOptions);

    if (isImage) {
      // uploadResized ---> сжимать картинку для медиум смалл и лардж
      // и сохранять в соответствующих папках
      const filePathForThisSize = join(
        pathToFile,
        'medium/large/small',
        filename,
      ).replace(/\\/g, '/');
    }

    return {
      fileName: name,
      fileNameWithExt: filename,
      fileExt: ext,
      filePath,
      mimetype,
    } as Partial<FileEntity>;
  }

  async uploadOne(
    file: IMultipartFile,
    filePath: string,
    options: BlockBlobParallelUploadOptions = STORAGE_DEFAULT_UPLOAD_OPTIONS,
  ): Promise<BlobUploadCommonResponse> {
    const containerClient = this.client.getContainerClient(
      this.blobContainerName,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(filePath);

    return blockBlobClient.uploadData(file.data, options).catch(() => {
      throw new BadRequestException(ErrorMessagesEnum.FILE_UPLOAD_ERROR);
    });
  }

  async deleteOne(filePath: string): Promise<BlobDeleteResponse> {
    const containerClient = this.client.getContainerClient(
      this.blobContainerName,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(filePath);

    return blockBlobClient.delete().catch(() => {
      throw new BadRequestException(ErrorMessagesEnum.FILE_DELETION_ERROR);
    });
  }
}
