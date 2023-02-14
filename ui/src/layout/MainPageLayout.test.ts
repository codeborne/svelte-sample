import {render} from '@testing-library/svelte'
import MainPageLayout from 'src/layout/MainPageLayout.svelte'

describe('Main Page Layout', ()=> {
  it('renders language select field', async () =>{
    const {container} = render(MainPageLayout)
    expect(container.querySelector('.lang')).to.exist
  })
})
