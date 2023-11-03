export function debounce<T extends (...args: Parameters<T>) => void>(f: T, millis = 500) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => f(...args), timer ? millis : 0);
  };
}
