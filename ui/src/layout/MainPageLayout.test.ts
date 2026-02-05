import {render} from '@testing-library/svelte'
import MainPageLayout from 'src/layout/MainPageLayout.svelte'

describe('Main Page Layout', ()=> {
  it('renders language select dropdown', async () =>{
    const {container} = render(MainPageLayout)
    // LangSelect button should contain current language code (e.g., "en") in uppercase
    const langButton = Array.from(container.querySelectorAll('button')).find(
      btn => /^[a-z]{2}$/i.test(btn.textContent?.trim() || '')
    )
    expect(langButton).to.exist
    expect(langButton?.textContent?.trim()).to.match(/^(en|et|ru)$/)
  })
})
