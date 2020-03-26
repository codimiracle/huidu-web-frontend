export default class CollectionUtil {
  static forEach<T>(array: Array<T>, callbackFn: (value: T, index: number, array: T[]) => void, thisArg?: any) {
    (array || []).filter(e => e).forEach(callbackFn, thisArg);
  }
  static map<T, U>(array: Array<T>, callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return (array || []).filter((e) => e).map<U>(callbackFn, thisArg);
  }
}