import { BlobServiceClient } from '@azure/storage-blob';
import { IBlobStorage } from './interfaces/blob-storage.interface';
import { IBlobConfiguration } from './interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlobStorage implements IBlobStorage {
  private readonly client: BlobServiceClient;
  private readonly blobContainerName: string;

  constructor(
    blobConfiguration: IBlobConfiguration,
    blobContainerName: string,
  ) {
    this.client = BlobServiceClient.fromConnectionString(
      blobConfiguration.connectionString,
    );

    this.blobContainerName = blobContainerName;
  }

  async putContent(fileName: string): Promise<void> {
    await this.client
      .getContainerClient(this.blobContainerName)
      .getBlockBlobClient(fileName)
      .upload('', 0);
  }

  containsFileByName(fileName: string): Promise<boolean> {
    return this.client
      .getContainerClient(this.blobContainerName)
      .getBlockBlobClient(fileName)
      .exists();
  }

  async findByFilm(filmId: string): Promise<string[]> {
    const blobItems = this.client
      .getContainerClient(this.blobContainerName)
      .listBlobsFlat({ prefix: filmId });

    const genresIds: string[] = [];
    for await (const blobItem of blobItems) {
      const genreId = blobItem.name.split('_')[1];

      genresIds.push(genreId);
    }

    return genresIds;
  }
}
