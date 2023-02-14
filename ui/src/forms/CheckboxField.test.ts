import {render} from '@testing-library/svelte'
import CheckboxField from './CheckboxField.svelte'
import {_} from 'src/i18n'

it('generates id', () => {
  const {container} = render(CheckboxField, {label: 'merchant.consent'})
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.id).to.eq('merchant-consent')
  expect(input.type).to.eq('checkbox')
  expect(input.checked).to.be.false
  expect(input.required).to.be.false
  expect(container.querySelector('label')!.textContent).to.eq(_('merchant.consent'))
})
