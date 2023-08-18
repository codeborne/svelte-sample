import {render} from '@testing-library/svelte'
import SamplesPage from './index.svelte'

describe('SamplesPage', () => {
  it('renders', async () => {
    const {container} = render(SamplesPage)
    expect(container.textContent).to.contain('Button')
  })
})
