interface Array<T extends any> {
  first(): T
  last(): T
  sum(by?: (e: T) => number): number
  max(): T
  max<R>(by: (e: T) => R): R
  min(): T
  min<R>(by: (e: T) => R): R
  indexBy(by: (e: T) => string|number): {[by: string]: T}
  indexBy<R>(by: (e: T) => string|number, combiner: (e: T, r: R) => R, initial?: R): {[by: string]: R}
  groupBy(by: (e: T) => string|number): {[by: string]: T[]}
  countBy<R>(by: (e: T) => string|number): {[by: string]: number}
  toObject(): {[by: string]: any}
  remove(i: number): this
  replaceById<E extends T & {id: string}>(e: E): this
}
