export type Subscriber<T> = (state: T) => void;

export abstract class Presenter<T, S> {
  protected subscriber: Subscriber<T> | undefined;

  protected constructor(protected state: T, protected selectors: () => S) {}

  public getLocalState(): T {
    return this.state;
  }

  public getReduxSelectors(): () => S {
    return this.selectors;
  }

  protected updateState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
    this.subscriber?.call(this.subscriber, this.state);
  }

  public onStateUpdated(subscriber: Subscriber<T>): void {
    this.subscriber = subscriber;
    this.subscriber(this.state);
  }
}
