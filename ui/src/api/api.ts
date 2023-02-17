import {versionRefreshNeeded} from '../stores/toasts'
import mocks from './mocks'

export const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'} as HeadersInit

type Body = object|string|FormData|File

class Api {
  prefix = '/api/'

  request(path: string, init?: RequestInit | {body?: Body, headers?: HeadersInit}): Promise<Response> {
    path = this.prefix + path
    if (path.includes('//')) throw new Error('Invalid path: ' + path)
    document.documentElement.classList.add('loading')
    const disabledButtons = this.disableSubmitButtons((init as RequestInit)?.method)

    const body = init?.body
    return fetch(path, {
      ...init,
      body: body instanceof File || body instanceof FormData ? body : body && JSON.stringify(body),
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
      data = response.status == 204 ? undefined : await response.json()
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
    if (error.message === 'Failed to fetch' || error.errno) throw {message: 'errors.networkUnavailable'}
    else throw error
  }

  async get<T>(path: string): Promise<T> {
    const pathNoQuery = path.replace(/\?.*/, '')
    if (pathNoQuery in mocks) return mocks[pathNoQuery]
    return await this.requestJson(path) as T
  }

  async post<T>(path: string, body?: Body, headers?: HeadersInit): Promise<T> {
    return await this.requestJson(path, {method: 'POST', body, headers})
  }

  async put<T>(path: string, body?: Body, headers?: HeadersInit): Promise<T> {
    return await this.requestJson(path, {method: 'PUT', body, headers})
  }

  async delete(path: string) {
    return await this.requestJson(path, {method: 'DELETE'})
  }

  async patch(path: string, body: object) {
    return await this.requestJson(path, {method: 'PATCH', body})
  }

  disableSubmitButtons(method?: string) {
    if (method === 'GET') return
    const buttons = document.querySelectorAll<HTMLButtonElement>("form button:not(:disabled)")
    buttons.forEach(btn => btn.disabled = true)
    return buttons
  }
}

export default new Api()
