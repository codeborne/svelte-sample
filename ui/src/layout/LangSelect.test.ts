import {fireEvent, render} from '@testing-library/svelte'
import LangSelect from './LangSelect.svelte'
import {user} from 'src/stores/auth'

describe('LangSelect', () => {
  const location = {pathname: '', href: ''} as Location

  it('renders language select field', async () => {
    const {container} = render(LangSelect)
    expect(container.querySelector('select')).to.exist
  })

  it('updates locale', async () => {
    user.set(null as any)
    location.pathname = '/en'
    const {container} = render(LangSelect, {location})
    const selection = container.querySelector('select')!
    expect(selection.value).eq('en')
    await fireEvent.change(selection, { target: { value: 'et' } });
    expect(selection.value).eq('et')
    expect(location.href).to.eq('/et')
  })

  it('saves user locale when changing language', async () => {
    const {container} = render(LangSelect, {location})
    const selection = container.querySelector('select')!
    expect(selection.value).eq('en')
    await fireEvent.change(selection, {target: {value: 'et'}})
  })
})
