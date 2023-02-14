import {render} from '@testing-library/svelte'
import ContactLink from './ContactLink.svelte'

describe('ContactLink', () => {
  it('phone', () => {
    const {container} = render(ContactLink, {contact: '+37255443322'})
    const link = container.querySelector('a')!
    expect(link.textContent).to.eq('+37255443322')
    expect(link.getAttribute('href')).to.eq('tel:+37255443322')
  })

  it('email gets zero-width-space', () => {
    const {container} = render(ContactLink, {contact: 'test@example.com'})
    const link = container.querySelector('a')!
    expect(link.textContent).to.eq('test\u200B@example.com')
    expect(link.getAttribute('href')).to.eq('mailto:test@example.com')
  })
})
