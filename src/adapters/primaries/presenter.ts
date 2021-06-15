export type Subscriber<T> = (state: T) => void;

export abstract class Presenter<T, U> {
  protected initialState: T;
  protected subscriber: Subscriber<T> | undefined;

  protected constructor(protected state: T) {
    this.initialState = state;
  }

  public abstract getViewModel(): U;

  protected updateState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
    this.subscriber?.call(this.subscriber, this.state);
  }

  public onStateUpdated(subscriber: Subscriber<T>): void {
    this.subscriber = subscriber;
    this.subscriber(this.state);
  }

  public getInitialState(): T {
    return this.initialState;
  }
}
