interface $$Generic<T = any> {} // actually part of svelte
type FormEvent = Event & {currentTarget: HTMLInputElement}

interface Window {
  apiVersion?: string
  e2eTest?: boolean
}
