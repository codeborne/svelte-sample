import {render} from '@testing-library/svelte'
import Alert from './Alert.svelte'
describe('Alert', () => {
  it('renders alert box', async () => {
    const {container} = render(Alert)
    expect(container.querySelector('.alert')).to.exist
    expect(container.querySelector('.alert .font-bold')).to.exist
  })
})
