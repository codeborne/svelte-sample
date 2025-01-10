import {render} from '@testing-library/svelte'
import Alert from './Alert.svelte'
import type { Snippet } from 'svelte'

describe('Alert', () => {
  it('renders alert box', async () => {
    const {container} = render(Alert, {
      props: {
        children: (() => 'Test Alert') as unknown as Snippet
      }
    })
    const alert = container.querySelector('.alert')
    expect(alert).to.exist
  })
})
