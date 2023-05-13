export interface RadioOption {
  label?: string,
  value: string,
  data?: any
}

export function objectToOptions(options: Object): RadioOption[] {
  return Object.entries(options).map(([value, label]) => ({value, label: label}))
}
