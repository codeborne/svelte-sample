import {render} from '@testing-library/svelte'
import DateRange from './DateRange.svelte'
import {today, yesterday} from '../i18n'

describe('DateRange', () => {
  it('renders', async () => {
    const {container} = render(DateRange, {from: yesterday, until: today})
    expect(container.querySelectorAll('input[type=date]')).to.have.length(2)
  })
})
