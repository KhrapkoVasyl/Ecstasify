import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { Inject, Injectable } from '@nestjs/common';
import { SERVICE_BUS_QUEUE_NAME_TOKEN } from 'src/common/constants';
import { BasePublisher } from 'src/common/service-bus';

@Injectable()
class DeletedAuthorsPublisher extends BasePublisher {
  private readonly publisher: ServiceBusSender;

  constructor(
    private readonly serviceBusClient: ServiceBusClient,
    @Inject(SERVICE_BUS_QUEUE_NAME_TOKEN)
    protected readonly queueName: string,
  ) {
    super();

    this.publisher = this.serviceBusClient.createSender(queueName);
  }

  async publish(data: unknown): Promise<void> {
    await this.publisher.sendMessages({ body: data });
  }
}

export { DeletedAuthorsPublisher };
