import {render} from '@testing-library/svelte'
import Badge from './Badge.svelte'
import type { Snippet } from 'svelte'

describe('Badge', () => {
  it('renders badge with default props', async () => {
    const { container } = render(Badge, {
      props: {
        children: (() => 'Test Badge') as unknown as Snippet
      }
    })
    const badge = container.querySelector('.badge')
    expect(badge).to.exist
  })
})
