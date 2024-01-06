abstract class BasePublisher {
  abstract publish(data: unknown): Promise<void>;
}

export { BasePublisher };
