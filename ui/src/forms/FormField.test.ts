import {render} from '@testing-library/svelte'
import FormField from './FormField.svelte'
import {_} from 'src/i18n'

it('generates id', () => {
  const {container} = render(FormField, {label: 'merchant.firstName'})
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.id).to.eq('merchant-firstName')
  expect(input.type).to.eq('text')
  expect(input.required).to.be.true
  expect(input.maxLength).to.eq(100)
  expect(container.querySelector('label')!.textContent!.trim()).to.eq(_('merchant.firstName'))
})

it('can redefine class', () => {
  const {container} = render(FormField, {label: 'merchant.lastName', class: 'my-class'})
  expect(container.querySelector('.my-class')).to.exist
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.required).to.be.true
})

it('can redefine type', () => {
  const {container} = render(FormField, {label: 'merchant.firstName', type: 'number'})
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.type).to.eq('number')
})

it('can provide a custom validator function', () => {
  const {container} = render(FormField, {label: 'merchant.firstName', type: 'number', validator: () => 'error'})
  const input = container.querySelector('input') as HTMLInputElement
  expect(input.validity.valid).to.be.false
})

it('can include help text', () => {
  const {container} = render(FormField, {label: 'some.label', helpText: 'Mega help'})
  expect(container.querySelector('.help-text')!.getAttribute('title')).to.eq('Mega help')
})
