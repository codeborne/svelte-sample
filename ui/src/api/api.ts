import {versionRefreshNeeded} from '../stores/toasts'
import mocks from './mocks'

export const headers = {'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'application/json'} as HeadersInit

type Body = object|string|FormData|File

class Api {
  prefix = '/api/'

  request(path: string, init?: RequestInit | {body?: Body, headers?: HeadersInit}): Promise<Response> {
    if (path.startsWith('/')) throw new Error('Invalid path: ' + path)
    path = this.prefix + path
    document.documentElement.classList.add('loading')
    const disabledButtons = this.disableSubmitButtons((init as RequestInit)?.method)

    const body = init?.body
    return fetch(path, {
      ...init,
      body: body instanceof File || body instanceof FormData || typeof body == 'string' ? body : body && JSON.stringify(body),
      headers: init?.headers ?? headers
    })
    .catch(this.handleFetchFailure)
    .finally(() => {
      document.documentElement.classList.remove('loading')
      disabledButtons?.forEach(btn => btn.disabled = false)
    }) as Promise<Response>
  }

  requestJson(path: string, init?: RequestInit | {body?: Body, headers?: HeadersInit}) {
    return this.request(path, init).then(this.extractJsonHandlingErrors)
  }

  private async extractJsonHandlingErrors(response: Response): Promise<any> {
    let data: any
    try {
      data = response.status == 204 ? await response.text(): await response.json()
    } catch (e) {
      console.error('Not a JSON', e)
      throw {message: 'errors.notJson'}
    }
    const apiVersion = response.headers?.get('x-api-version')
    if (response.status < 200 || response.status >= 400) {
      data.message = data.message || data.reason
      throw data
    } else if (apiVersion && apiVersion != window['version']) {
      setTimeout(versionRefreshNeeded, 1000)
    }
    return data
  }

  private handleFetchFailure(error: any) {
    if (error.message === 'Failed to fetch' || error.message === 'Load failed' || error.errno) throw {message: 'errors.networkUnavailable'}
    else throw error
  }

  async get<T>(path: string): Promise<T> {
    const pathNoQuery = path.replace(/\?.*/, '')
    if (pathNoQuery in mocks) return mocks[pathNoQuery]
    return await this.requestJson(path) as T
  }

  post<T>(path: string, body?: Body, headers?: HeadersInit): Promise<T> {
    return this.requestJson(path, {method: 'POST', body, headers})
  }

  put<T>(path: string, body?: Body, headers?: HeadersInit): Promise<T> {
    return this.requestJson(path, {method: 'PUT', body, headers})
  }

  delete(path: string) {
    return this.requestJson(path, {method: 'DELETE'})
  }

  patch(path: string, body: object) {
    return this.requestJson(path, {method: 'PATCH', body})
  }

  disableSubmitButtons(method?: string) {
    if (method === 'GET') return
    const buttons = document.querySelectorAll<HTMLButtonElement>("form button:not(:disabled)")
    buttons.forEach(btn => btn.disabled = true)
    return buttons
  }
}

export default new Api()
