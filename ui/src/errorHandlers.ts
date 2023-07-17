import api from './api/api'
import {_, navigate} from './i18n'
import {showToast, ToastType} from './stores/toasts'

export function jsErrorHandler(message: Event|string, source?: string, line?: number, column?: number, error?: Error) {
  reportError({message, source, line, column}, error)
  alert((error?.name == 'SyntaxError' ? 'Your browser is probably too old, please update:' : 'Technical error occurred, please reload the page:') + '\n' + message)
}

export function reportError(body: object, error?: Error) {
  api.post('js-error', {...body,
    href: location.href,
    userAgent: navigator.userAgent,
    stack: error?.stack
  }).catch(e => console.error(e))
}

export function handleUnhandledRejection(event: PromiseRejectionEvent) {
  const e: Error & {statusCode: number} | undefined = event.reason
  console.error(e)
  if (e?.stack) return jsErrorHandler(e.message, undefined, undefined, undefined, e)
  let message = e?.message
  if (message) message = _(message)
  else message = _('errors.technical') + ': ' + e
  showToast(message, {type: ToastType.ERROR})
  if (e?.statusCode === 401 || e?.statusCode === 403) setTimeout(() => navigate(''), 1000)
}

export function initErrorHandlers() {
  window.onerror = jsErrorHandler
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
}
