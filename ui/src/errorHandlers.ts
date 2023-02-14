import api from './api/api'
import {_, navigate} from './i18n'
import {showToast, ToastType} from './stores/toasts'

export function jsErrorHandler(message: Event|string, source?: string, line?: number, column?: number, error?: Error) {
  reportError({message, source, line, column}, error)
  alert('Technical error occurred, please reload the page:\n' + message)
}

export function reportError(body: object, error?: Error) {
  api.post('js-error', {...body,
    href: location.href,
    userAgent: navigator.userAgent,
    stack: error?.stack
  }).catch(e => console.error(e))
}

export function handleUnhandledRejection(e: PromiseRejectionEvent) {
  console.error(e)
  if (e.reason?.stack) {
    jsErrorHandler(e.reason.message, undefined, undefined, undefined, e.reason)
    return
  }
  let error = e.reason?.message
  if (error) error = _(e.reason?.message)
  else error = _('errors.technical') + ': ' + e.reason
  showToast(error, {type: ToastType.ERROR})
  if (e.reason.statusCode === 401 || e.reason.statusCode === 403) setTimeout(() => navigate(''), 1000)
}

export function initErrorHandlers() {
  window.onerror = jsErrorHandler
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
}
