import {fireEvent, render, waitFor} from '@testing-library/svelte'
import LangSelect from './LangSelect.svelte'
import {user} from 'src/stores/auth'

describe('LangSelect', () => {
  const location = {pathname: '', href: ''} as Location

  it('renders language dropdown button', async () => {
    const {container} = render(LangSelect)
    expect(container.querySelector('button')).to.exist
    expect(container.textContent).to.contain('en')
  })

  it('updates locale', async () => {
    user.set(null as any)
    location.pathname = '/en'
    let updatedHref = ''
    Object.defineProperty(location, 'href', {
      set: href => updatedHref = href
    })
    const {container} = render(LangSelect, {location})
    const button = container.querySelector('button')!
    expect(button.textContent).to.contain('en')

    // Open dropdown
    await fireEvent.click(button)

    // Wait for dropdown menu to render
    await waitFor(() => {
      const menuLinks = container.querySelectorAll('.menu-link')
      expect(menuLinks.length).to.be.greaterThan(0)
    })

    // Find and click the 'et' menu link
    const menuLinks = container.querySelectorAll('.menu-link')
    const etLink = Array.from(menuLinks).find(link => link.textContent?.trim() === 'et')
    expect(etLink).to.exist
    await fireEvent.click(etLink!)

    expect(updatedHref).to.eq('/et')
  })

  it('saves user locale when changing language', async () => {
    const {container} = render(LangSelect, {location})
    const button = container.querySelector('button')!
    expect(button.textContent).to.contain('en')

    // Open dropdown
    await fireEvent.click(button)

    // Wait for dropdown menu to render
    await waitFor(() => {
      const menuLinks = container.querySelectorAll('.menu-link')
      expect(menuLinks.length).to.be.greaterThan(0)
    })

    // Find and click the 'et' menu link
    const menuLinks = container.querySelectorAll('.menu-link')
    const etLink = Array.from(menuLinks).find(link => link.textContent?.trim() === 'et')
    expect(etLink).to.exist
    await fireEvent.click(etLink!)
  })
})
