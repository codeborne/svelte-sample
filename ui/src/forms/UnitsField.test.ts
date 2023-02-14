import {render} from '@testing-library/svelte'
import {_} from 'src/i18n'
import UnitsField from './UnitsField.svelte'
import {fillInput} from 'src/test-utils'

describe('UnitsField', () => {
  it('renders', () => {
    const {container} = render(UnitsField, {label: 'items.number', units: ['€', '%'], value: 100, unitRatio: 0.01, min: 1, max: 34})
    const input = container.querySelector('input')!
    expect(input.id).to.eq('items-number')
    expect(input.type).to.eq('number')
    expect(input.step).to.eq('1')
    expect(input.min).to.eq('1')
    expect(input.max).to.eq('34')
    expect(input.value).to.eq('100')
    expect(container.querySelector('label')!.textContent!.trim()).to.eq(_('items.number'))
    expect(container.querySelector('select')!.value).to.eq('€')
  })

  it('converts on render if not default unit', () => {
    const {container} = render(UnitsField, {label: 'items.number', units: ['€', '%'], unit: '%', value: 100, unitRatio: 0.1, min: 10, max: 200})
    const input = container.querySelector('input')!
    expect(input.min).to.eq('1')
    expect(input.max).to.eq('20')
    expect(input.value).to.eq('10')
    expect(container.querySelector('select')!.value).to.eq('%')
  })

  it('converts value from one unit to another', async () => {
    const {container, component} = render(UnitsField, {label: 'items.number', value: 123, units: ['€', '%'], unitRatio: 0.04, step: 0.01, min: 10, max: 340})
    const input = container.querySelector('input')!
    expect(input.value).to.eq('123')

    const select = container.querySelector('select')!
    expect(select.value).to.eq('€')

    await fillInput(select, '%')
    expect(select.value).to.eq('%')
    expect(input.value).to.eq('4.92')
    expect(input.min).to.eq('0.00')
    expect(input.max).to.eq('14.00')
    expect(component.value).to.eq(123)

    await fillInput(select, '€')
    expect(select.value).to.eq('€')
    expect(input.value).to.eq('123')
    expect(input.min).to.eq('10.00')
    expect(input.max).to.eq('340.00')
    expect(component.value).to.eq(123)
  })

  it('does not break if user deletes the old value before entering a new one', async () => {
    const {container, component} = render(UnitsField, {value: 1, units: ['€', '%'], unitRatio: 0.01})
    const input = container.querySelector('input')!
    await fillInput(input, '')
    expect(component.value).to.be.undefined
  })
})
