import {render} from '@testing-library/svelte'
import RangeSlider from './RangeSlider.svelte'

describe('RangeSlider', () => {
  it('renders', async () => {
    const {container} = render(RangeSlider, {value: 50, min: 1, max: 100})
    expect(container.querySelector('input[type=range]')).to.exist
  })
})
