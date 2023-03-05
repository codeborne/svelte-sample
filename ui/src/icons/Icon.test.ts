import {render} from '@testing-library/svelte'
import Icon from './Icon.svelte'

describe('Icon', () => {
  const name = 'x'
  const focusable = true

  it('renders', async () => {
    const {container} = render(Icon, {name, focusable})
    expect(container.querySelector('svg.icon.x')).to.exist
  })
})
