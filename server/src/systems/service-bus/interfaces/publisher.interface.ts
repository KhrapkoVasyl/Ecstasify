export interface IPublisher {
  publish(id: string): Promise<void>;
}
