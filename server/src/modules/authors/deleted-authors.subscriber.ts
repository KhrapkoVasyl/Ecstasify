import {
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
} from '@azure/service-bus';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SERVICE_BUS_QUEUE_NAME_TOKEN } from 'src/common/constants';
import { BaseSubscriber } from 'src/common/service-bus';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
class DeletedAuthorsSubscriber extends BaseSubscriber implements OnModuleInit {
  private readonly subscriber: ServiceBusReceiver;

  constructor(
    private readonly serviceBusClient: ServiceBusClient,
    @Inject(SERVICE_BUS_QUEUE_NAME_TOKEN)
    private readonly queueName: string,
    private readonly tracksService: TracksService,
  ) {
    super();

    this.subscriber = this.serviceBusClient.createReceiver(this.queueName);

    this.processMessage = this.processMessage.bind(this);
  }

  async onModuleInit() {
    await this.subscribe();
  }

  async subscribe(): Promise<void> {
    this.subscriber.subscribe({
      processMessage: this.processMessage,
      processError: this.processError,
    });
  }

  async processMessage(message: ServiceBusReceivedMessage) {
    await this.subscriber.completeMessage(message);

    await this.tracksService.updateMany(
      { authorId: message.body },
      { authorId: null },
    );
  }
}

export { DeletedAuthorsSubscriber };
