import {render} from '@testing-library/svelte'
import SelectField from './SelectField.svelte'

it('renders options object and pre-selects first value', () => {
  const options = {'123': 'Label1', '234': 'Label2'}
  const {component} = render(SelectField, {label: 'prefix.label', options})
  const select = component.select!
  expect(select.id).to.eq('prefix-label')
  expect(select.required).to.be.true

  expect(select.options).to.have.length(2)
  expect(select.options[0].label).to.eq('Label1')
  expect(select.options[0].value).to.eq('123')
  // TODO vite > 4.0.4 upgrade broke this in test only
  // expect(component.value).to.eq('123')
  // expect(select.value).to.eq('123')
})

it('can preselect numeric values (converting to string)', () => {
  const options = {'123': 'Label1', '234': 'Label2'}
  const {component} = render(SelectField, {value: 234, options})
  const select = component.select!
  expect(select.value).to.eq('234')
  expect(select.selectedIndex).to.eq(1)
})

it('renders options array', () => {
  const options = ['Label1', 'Label2']
  const {component} = render(SelectField, {label: 'label', options, required: false})
  const select = component.select!
  expect(select.required).to.be.false

  expect(select.options).to.have.length(2)
  expect(select.options[0].label).to.eq('Label1')
  expect(select.options[0].value).to.eq('0')
})

it('emptyOption', () => {
  const options = ['Label1', 'Label2']
  const {component} = render(SelectField, {label: 'label', options, emptyOption: '<None>'})
  const select = component.select!
  expect(select.options).to.have.length(3)
  expect(select.options[0].label).to.eq('<None>')
  expect(select.options[0].value).to.eq('')
  expect(select.value).to.eq('')
  expect(select.selectedIndex).to.eq(0)
})
