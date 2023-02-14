import {render} from '@testing-library/svelte'
import AmountField from './AmountField.svelte'

describe('AmountField', () => {
  it('renders', async () => {
    const {container} = render(AmountField, {value: 123, currency: 'EUR'})
    expect(container.querySelector('input')!.value).to.eq('123')
    expect(container.querySelector('input')!.step).to.eq('any')
    expect(container.querySelector('.unit')!.textContent).to.contain('€')
  })
})
