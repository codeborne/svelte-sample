import {_} from 'src/i18n'
import {handleUnhandledRejection} from './errorHandlers'
import {get} from 'svelte/store'
import {toastStore} from './stores/toasts'

describe('handles unhandled promises', () => {
  let promise: Promise<any>

  function PromiseRejectionEvent(init: PromiseRejectionEventInit) {
    return Object.assign(new CustomEvent('unhandledrejection', init), init) as PromiseRejectionEvent
  }

  beforeEach(() => {
    promise = Promise.reject('')
  })

  afterEach(() => {
    toastStore.set([])
    promise.catch(() => {})
  })

  it('without translation', async () => {
    const e = PromiseRejectionEvent({reason: {message: 'no translation'}, promise})
    handleUnhandledRejection(e)
    expect(get(toastStore).last().message).to.eq('no translation')
  })

  it('with translation', async () => {
    const e = PromiseRejectionEvent({reason: {message: 'errors.technical', statusCode: 500}, promise})
    handleUnhandledRejection(e)
    expect(get(toastStore).last().message).to.eq(_('errors.technical'))
  })
})
