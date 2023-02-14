import {get, writable} from 'svelte/store'
import {_} from '../i18n'

export enum ToastType {
  SUCCESS = 'success', WARNING = 'warning', INFO = 'info', ERROR = 'error'
}

interface ToastOptions {
  title?: string
  type: ToastType
  timeoutSec: number
  html?: boolean
}

interface Toast extends ToastOptions {
  id: number
  message: string
}

export const toastStore = writable<Array<Toast>>([])

export function versionRefreshNeeded() {
  const title = _('home.apiVersionUpdate.title')
  if (get(toastStore).find(t => t.title == title)) return
  const message = _('home.apiVersionUpdate.message') + `
    <a onclick="location.reload()" class="btn success block mt-3">${_('home.apiVersionUpdate.action')}</a>
  `
  showToast(message, {title, type: ToastType.WARNING, timeoutSec: 10000, html: true})
}

export function showToast(message: string, options?: Partial<ToastOptions>): Toast {
  const toast: Toast = {id: Math.random(), type: ToastType.SUCCESS, timeoutSec: options?.type == ToastType.ERROR ? 10 : 5, message, ...options}
  toastStore.update(a => [...a, toast])
  setTimeout(() => hideToast(toast), toast.timeoutSec * 1000)
  return toast
}

export function hideToast(toast: Toast) {
  toastStore.update(a => a.filter(t => t !== toast))
}
