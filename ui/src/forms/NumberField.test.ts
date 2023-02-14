import {render} from '@testing-library/svelte'
import {_} from 'src/i18n'
import NumberField from './NumberField.svelte'

it('renders', () => {
  const {container} = render(NumberField, {label: 'items.number', unit: '€'})
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.id).to.eq('items-number')
  expect(input.type).to.eq('number')
  expect(input.required).to.be.true
  expect(input.maxLength).to.eq(10)
  expect(container.querySelector('label')!.textContent!.trim()).to.eq(_('items.number'))
  expect(container.querySelector('.unit')!.textContent).to.eq('€')
})
