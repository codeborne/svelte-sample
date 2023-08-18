import {render} from '@testing-library/svelte'
import SamplesPage from './index.svelte'
import {params} from '@roxi/routify'

describe('SamplesPage', () => {
  it('renders', async () => {
    // TODO: how to initialize routify stores in tests?
    const {container} = render(SamplesPage)
    expect(container.textContent).to.contain('Button')
  })
})
