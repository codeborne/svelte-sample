import {render} from '@testing-library/svelte'
import Link from './Link.svelte'

describe('Link', () => {
  const to = 'dashboard'
  const label = 'test'

  it('renders link', async () => {
    const {container} = render(Link, {to, label})
    const a = container.querySelector('a')!
    expect(a.getAttribute('href')).to.eq('/dashboard')
    expect(container.textContent).to.contain(label)
  })
})
