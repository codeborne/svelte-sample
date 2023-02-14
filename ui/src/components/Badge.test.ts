import {render} from '@testing-library/svelte'
import Badge from './Badge.svelte'

describe('Badge', () => {
  it('renders badge', async () => {
    const {container} = render(Badge)
    expect(container.querySelector('.badge')).to.exist
  })
})
