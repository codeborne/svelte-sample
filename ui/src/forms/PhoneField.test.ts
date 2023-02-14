import {act, createEvent, fireEvent, render} from '@testing-library/svelte'
import PhoneField from './PhoneField.svelte'
import {CountryCode} from 'src/api/types'
import {expect} from 'vitest'

describe('PhoneField', () => {

  const pasteEvent = (input: HTMLInputElement, content: string) => createEvent.paste(input, {
    clipboardData: {
      getData: () => content,
    },
  })

  it('with known country', async () => {
    const {container, component} = render(PhoneField, {value: '3725626262', countryCode: CountryCode.EE})
    const input = container.querySelector('input')!
    expect(input.value).to.eq('+3725626262')
    expect(input.type).to.eq('tel')

    await act(() => component.$$set!({value: undefined}))
    expect(input.value).to.eq('')

    await fireEvent.focus(input)
    expect(input.value).to.eq('+372')
    await fireEvent.blur(input)
    expect(input.value).to.eq('')
  })

  it('pasting phone number with existing area code', async () => {
    const {container} = render(PhoneField, {countryCode: CountryCode.EE})
    const input = container.querySelector('input')!
    const paste = pasteEvent(input, '+37155550000')

    await fireEvent.focus(input)
    expect(input.value).to.eq('+372')
    await fireEvent(input, paste)
    expect(input.value).to.eq('+37155550000')
  })

  it('pasting phone number without area code', async () => {
    const {container} = render(PhoneField, {countryCode: CountryCode.EE})
    const input = container.querySelector('input')!
    const paste = pasteEvent(input, '55550000')

    await fireEvent.focus(input)
    expect(input.value).to.eq('+372')
    await fireEvent(input, paste)
    expect(input.value).to.eq('+37255550000')
  })
})
