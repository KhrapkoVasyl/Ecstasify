import { Inject, Injectable } from '@nestjs/common';
import { ISubscriber } from './interfaces';
import {
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
} from '@azure/service-bus';
import { SERVICE_BUS_QUEUE_NAME_TOKEN } from 'src/common/constants';

@Injectable()
export class FilmStatsSubscriber implements ISubscriber {
  private readonly client: ServiceBusClient;
  private readonly subscriber: ServiceBusReceiver;
  private readonly _ids: string[] = [];

  constructor(
    serviceBusClient: ServiceBusClient,
    @Inject(SERVICE_BUS_QUEUE_NAME_TOKEN)
    protected readonly queueName: string,
  ) {
    this.client = serviceBusClient;
    this.subscriber = this.client.createReceiver(queueName);

    this.processMessage = this.processMessage.bind(this);
  }

  get ids() {
    return this._ids;
  }

  async subscribe(): Promise<void> {
    this.subscriber.subscribe({
      processMessage: this.processMessage,
      processError: this.processError,
    });
  }

  protected async processMessage(message: ServiceBusReceivedMessage) {
    this._ids.push(message.body.toString());
    await this.subscriber.completeMessage(message);
  }

  protected async processError(args: ProcessErrorArgs) {
    console.error(args.error);
  }
}
