abstract class BaseSubscriber {
  abstract subscribe(): Promise<void>;

  protected async processError(error: unknown) {
    console.error(error);
  }
}

export { BaseSubscriber };
