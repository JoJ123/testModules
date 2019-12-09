export type UnsubscribeFn = () => void;
export type HookCallback<P, R = void> = (payload: P) => R | Promise<R>;

export class ProviderHook<Payload = any, ReturnValue = any> {
  private hookFn: HookCallback<Payload, ReturnValue> | null = null;

  constructor(defaultHook: HookCallback<Payload, ReturnValue> | null = null) {
    this.hook = this.hook.bind(this);
    this.trigger = this.trigger.bind(this);
    this.hookFn = defaultHook;
  }

  public hook(callback: HookCallback<Payload, ReturnValue>): UnsubscribeFn {
    this.hookFn = callback;

    return () => {
      this.hookFn = null;
    };
  }

  public async trigger(data: Payload): Promise<ReturnValue | null> {
    if (!this.hookFn) {
      return null;
    }

    return this.hookFn(data);
  }
}
