import {act, render} from '@testing-library/svelte'
import Toasts from './Toasts.svelte'
import {showToast, ToastType} from '../stores/toasts'

describe('Toasts', () => {
  it('renders success toast', async () => {
    const {container} = render(Toasts)
    await act(() => showToast('Great success', {type: ToastType.SUCCESS}))
    const toast = container.querySelector('.toast')!
    expect(toast.textContent).to.contain('Great success')
    expect(toast.querySelector('.text-success-400')).to.exist
  })

  it('renders warning toast', async () => {
    const {container} = render(Toasts)
    await act(() => showToast('Great warning', {type: ToastType.WARNING}))
    const toast = [...container.querySelectorAll('.toast')].last()
    expect(toast.textContent).to.contain('Great warning')
    expect(toast.querySelector('.text-warning-400')).to.exist
  })
})
