import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

    // not calling the function. returning the reference to the function
    get on() {
      return this.events.on;
    }
  
    get trigger() {
      return this.events.trigger;
    }
  
    get get() {
      return this.attributes.get;
    }
  
    set(update: T): void {
      this.attributes.set(update);
      this.events.trigger('change');
    }
  
    fetch(): void {
      const id = this.get('id');
  
      if (typeof id !== 'number') {
        throw new Error('Cannot fetch without an id');
      }
  
      this.sync.fetch(id).then(
        (res: AxiosResponse): void => {
          this.set(res.data);
        }
      );
    }
  
    save(): void {
      this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      })
    }
}