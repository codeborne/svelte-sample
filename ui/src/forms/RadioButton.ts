export interface RadioOption {
  label?: string,
  value: string,
  src?: string
}

export type RadioImageSize =  'md' | 'sm' | 'lg' | ''
export function objectToOptions(options: Object): RadioOption[] {
  return Object.entries(options).map(([value, label]) => ({value, label: label}))
}
