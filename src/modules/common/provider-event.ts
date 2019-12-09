export type UnsubscribeFn = () => void;
export type EventCallback<T> = (payload: T) => void | Promise<void>;

export class ProviderEvent<T = any> {
  private counter = 0;
  private registeredFn: Map<number, EventCallback<T>> = new Map();

  constructor() {
    this.register = this.register.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  public register(callback: EventCallback<T>): UnsubscribeFn {
    const counterId = this.counter++;
    this.registeredFn.set(counterId, callback);

    return () => {
      this.registeredFn.delete(counterId);
    };
  }

  public async trigger(data: T): Promise<void> {
    for (const fn of this.registeredFn.values()) {
      await fn(data);
    }
  }
}
