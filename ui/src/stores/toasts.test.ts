import {hideToast, showToast, toastStore, ToastType} from './toasts'
import {get} from 'svelte/store'

it('show/hide toast', () => {
  vi.useFakeTimers()
  const toast1 = showToast('Created stuff')
  expect(toast1.type).to.equal('success')
  expect(toast1.timeoutSec).to.equal(5)
  const toast2 = showToast('Failed', {type: ToastType.ERROR})
  expect(toast2.type).to.equal('error')
  expect(toast2.timeoutSec).to.equal(10)

  expect(get(toastStore)).to.deep.equal([toast1, toast2])

  hideToast(toast1)
  expect(get(toastStore)).to.deep.equal([toast2])

  vi.runAllTimers()
  expect(get(toastStore)).to.deep.equal([])
})
