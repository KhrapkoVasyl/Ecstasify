export interface ISubscriber {
  subscribe(): Promise<void>;
  get ids(): string[];
}
