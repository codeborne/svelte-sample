import {fireEvent} from '@testing-library/svelte'

export async function findInput(selector: string | HTMLInputElement | HTMLSelectElement, block?: (input: HTMLInputElement | HTMLSelectElement) => void) {
  const input = selector instanceof HTMLElement ? selector : document.querySelector(selector) as HTMLInputElement
  if (block) {
    block(input)
    await fireEvent.input(input)
    await fireEvent.change(input)
  }
  return input
}

export function fillInput(selector: string | HTMLInputElement | HTMLSelectElement, value: string) {
  return findInput(selector, i => i.value = value)
}
