import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { AppConfigModule } from 'src/config';
import { IStorageConfiguration } from './interfaces';
import { AppConfigService } from 'src/config/app-config.service';

@Module({
  imports: [AppConfigModule],
  providers: [
    StorageService,
    {
      provide: 'STORAGE_CONFIG',
      useFactory: (
        appConfigService: AppConfigService,
      ): IStorageConfiguration => ({
        connectionString: appConfigService.get<string>(
          'AZURE_BLOB_STORAGE_CONNECTION_STRING',
        ),
      }),
      inject: [AppConfigService],
    },
    {
      provide: 'CONTAINER_NAME',
      useFactory: (appConfigService: AppConfigService) =>
        appConfigService.get<string>('AZURE_BLOB_STORAGE_CONTAINER_NAME'),
      inject: [AppConfigService],
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
