export function debounce<T extends Function>(f: T, millis = 500): T {
  let timer: any
  return function(...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => f(...args), timer ? millis : 0)
  } as any as T
}
