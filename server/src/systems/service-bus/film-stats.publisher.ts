import { Inject, Injectable } from '@nestjs/common';
import { IPublisher } from './interfaces';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { SERVICE_BUS_QUEUE_NAME_TOKEN } from 'src/common/constants';

@Injectable()
export class FilmStatsPublisher implements IPublisher {
  private readonly client: ServiceBusClient;
  private readonly publisher: ServiceBusSender;

  constructor(
    serviceBusClient: ServiceBusClient,
    @Inject(SERVICE_BUS_QUEUE_NAME_TOKEN)
    protected readonly queueName: string,
  ) {
    this.client = serviceBusClient;
    this.publisher = this.client.createSender(queueName);
  }
  async publish(id: string): Promise<void> {
    await this.publisher.sendMessages({ body: id });
  }
}
