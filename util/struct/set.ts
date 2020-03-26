export class ObjectSet<T> {
  private originSet: Set<string>;
  private valueMap: Map<string, T>;
  private uniquer: (element: T) => string;
  constructor(iterable: Iterable<T>, uniquer?: (element: T) => string) {
    this.originSet = new Set();
    this.valueMap = new Map();
    if (!uniquer) {
      uniquer = (e) => JSON.stringify(e);
    }
    this.uniquer = uniquer;
    let iterator = iterable[Symbol.iterator]();
    while (true) {
      let result = iterator.next();
      if (result.done) {
        break;
      }
      let key = uniquer(result.value);
      this.originSet.add(key);
      this.valueMap.set(key, result.value);
    }
  }

  public get size(): number {
    return this.originSet.size;
  }
 
  public values(): IterableIterator<T> {
    return this.valueMap.values();
  }
  public add(element: T): this {
    let key = this.uniquer(element);
    this.originSet.add(key);
    this.valueMap.set(key, element);
    return this;
  }
  public addAll(...elements: T[]): this {
    elements.forEach((e) => this.add(e));
    return this;
  }
  public delete(element: T): boolean {
    let key = this.uniquer(element);
    return this.originSet.delete(key);
  }
  public has(element: T): boolean {
    let key = this.uniquer(element);
    return this.originSet.has(key);
  }
  public clear(): void {
    this.originSet.clear();
    this.valueMap.clear();
  }
  public forEach(callbackfn: (value: T, value2: T, set: ObjectSet<T>) => void, thisArg?: any): void {
    this.originSet.forEach((value: string, value2: string) => {
      callbackfn.apply(thisArg, [this.valueMap.get(value), this.valueMap.get(value2), this]);
    });
  }
}