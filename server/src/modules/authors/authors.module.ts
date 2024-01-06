import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './author.schema';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DeletedAuthorsPublisher } from './deleted-authors.publisher';
import { AppConfigService } from 'src/config/app-config.service';
import { ServiceBusClient } from '@azure/service-bus';
import {
  DELETED_AUTHORS_QUEUE_NAME,
  SERVICE_BUS_QUEUE_NAME_TOKEN,
} from 'src/common/constants';
import { DeletedAuthorsSubscriber } from './deleted-authors.subscriber';
import { TracksModule } from '../tracks';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    forwardRef(() => TracksModule),
  ],
  controllers: [AuthorsController],
  providers: [
    AuthorsService,
    {
      provide: ServiceBusClient,
      useFactory: (appConfigService: AppConfigService) =>
        new ServiceBusClient(
          appConfigService.get('AZURE_SERVICE_BUS_CONNECTION_STRING'),
        ),
      inject: [AppConfigService],
    },
    {
      provide: SERVICE_BUS_QUEUE_NAME_TOKEN,
      useFactory: (appConfigService: AppConfigService) =>
        appConfigService.get('AZURE_SERVICE_BUS_DELETED_AUTHORS_QUEUE_NAME'),
      inject: [AppConfigService],
    },
    DeletedAuthorsPublisher,
    DeletedAuthorsSubscriber,
  ],
  exports: [AuthorsService, DeletedAuthorsSubscriber],
})
export class AuthorsModule {}
