import {render} from '@testing-library/svelte'
import Icon from './Icon.svelte'

describe('Icon', () => {

  const name = 'x'
  const focusable = true

  it('renders icon', async () => {
    const {container} = render(Icon, {name, focusable})
    expect(container.querySelector('svg')).to.exist
    expect(container.querySelector('.icon')).to.exist
    expect(container.querySelector('.icon-x')).to.exist
  })
})
