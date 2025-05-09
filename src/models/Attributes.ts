export class Attributes<T extends object> {
  constructor(private data: T) {};

  // before refactoring
  // get(propName: string): (string | number) {
  //   return this.data[propName];
  // }

  // T represents type
  // K represents key. key can also be a type

  // after refactoring
  // <K extends keyof T> = generic constraints
  // T and K in this case could be either 'name', 'age', 'id'
  // T[K]: return an obj with K out of T 
  // make it to arrow function so 'this' is always instance of attributes we create
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set(update: T): void {
    // this.data = update;
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}