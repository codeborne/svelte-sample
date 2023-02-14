import {render} from '@testing-library/svelte'
import KeyValue from './KeyValue.svelte'

describe('KeyValue', () => {

  let label = 'i18n label'
  let value = 'value'
  const valueClass = ''

  it('renders keyValue', async () => {
    const {container} = render(KeyValue, {label, value, valueClass})
    expect(container.querySelector('div')).to.exist
    expect(container.textContent).to.include(label)
  })

  it('applies class to value when given', async () => {
    const {container} = render(KeyValue, {label, value, valueClass:'px-4'})
    expect(container.querySelector('.px-4')!.textContent).to.contain(value)
  })
})
