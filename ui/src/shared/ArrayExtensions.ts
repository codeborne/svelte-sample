Array.prototype.first = function() {return this[0]}
Array.prototype.last = function() {return this[this.length - 1]}
Array.prototype.sum = function<T>(by: (e: T) => number = v => v as any) {return this.reduce((r: number, e: T) => r + by(e), 0)}

Array.prototype.max = function<T, R>(by: (e: T) => R = v => v as any) {return this.reduce((r: R, e: T) => {
  const v = by(e)
  return v > r ? v : r
}, this.length ? by(this.first()) : undefined)}

Array.prototype.min = function<T, R>(by: (e: T) => R = v => v as any) {return this.reduce((r: R, e: T) => {
  const v = by(e)
  return v < r ? v : r
}, this.length ? by(this.first()) : undefined)}

Array.prototype.indexBy = function<T, R>(by: (e: T) => string|number, combiner: (e: T, r: R) => R = (e, _) => e as any, initial?: R) {return this.reduce((r: R, e: T) => {
  const v = by(e)
  r[v] = combiner(e, r[v] ?? initial)
  return r
}, {})}

Array.prototype.groupBy = function<T>(by: (e: T) => string|number) {
  return this.indexBy(by, (e: T, r: T[]) => [...r, e], [])
}

Array.prototype.countBy = function<T>(by: (e: T) => string|number) {
  return this.indexBy(by, (_: T, r: number) => r + 1, 0)
}

Array.prototype.toObject = function<T>() {
  return this.indexBy((e: T) => e[0], (e: T) => e[1])
}

Array.prototype.remove = function<T>(i: number) {
  this.splice(i, 1)
  return this
}

Array.prototype.replaceById = function<T extends {id: string}>(e: T) {
  this[this.findIndex((a: T) => a.id == e.id)] = e
  return this
}

export {}
