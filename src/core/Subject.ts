export type Observer<T> = (state: T) => void;

export class Subject<T> {
  private readonly observers = new Set<Observer<T>>();

  public subscribe(observer: Observer<T>) {
    this.observers.add(observer);
  }

  public unsubscribe(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  protected notify(state: T) {
    for (const observer of this.observers) {
      try {
        observer(state);
      } catch (error) {
        console.error("Observer failed:", error);
      }
    }
  }
}
