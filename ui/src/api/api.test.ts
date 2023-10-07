import api, {headers} from './api'
import {toastStore} from '../stores/toasts'
import {get} from 'svelte/store'
import {_} from 'src/i18n'
import type {SpyInstance} from 'vitest'

const successfulResponse = {status: 200, headers: {get: () => undefined}, json: () => 'data'} as any

describe('api', () => {
  let fetch: SpyInstance

  beforeEach(() => {
    fetch = vi.spyOn(global, 'fetch').mockResolvedValue(successfulResponse)
  })

  it('extracts json', async () => {
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(document.documentElement.classList.contains('loading')).to.equal(true)
    expect(fetch).toHaveBeenCalledWith('/api/path', {headers, body: '{"data":"data"}'})
    expect(await promise).to.equal('data')
    expect(document.documentElement.classList.contains('loading')).to.equal(false)
  })

  it('offers to refresh if version mismatch', async () => {
    vi.useFakeTimers()
    window['apiVersion'] = '2.3'
    fetch.mockResolvedValue({...successfulResponse, headers: {get: () => '2.2'}})
    await api.requestJson('path', {body: {data: 'data'}})
    expect(get(toastStore)).to.be.empty

    vi.advanceTimersByTime(10000)
    expect(get(toastStore)[0]?.title).to.eq(_('home.apiVersionUpdate.title'))
    vi.useRealTimers()
    window['apiVersion'] = undefined
  })

  it('supports null json response', async () => {
    fetch.mockResolvedValue({...successfulResponse, json: () => null})
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(await promise).to.be.null
  })

  it('supports No Content response', async () => {
    fetch.mockResolvedValue({...successfulResponse, status: 204, text: () => ''})
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(await promise).to.eq('')
  })

  it('handles http error', () => {
    fetch.mockResolvedValue({status: 403, json: () => Promise.resolve({statusCode: 403, message: '', reason: 'Forbidden'})})
    return api.requestJson('path', {headers}).then(() => {
      throw 'should be rejected'
    }, e => {
      expect(e).to.deep.equal({statusCode: 403, message: 'Forbidden', reason: 'Forbidden'})
      expect(document.documentElement.classList.contains('loading')).to.be.false
    })
  })

  describe('requests', () => {
    beforeEach(() => {
      vi.spyOn(api, 'requestJson')
    })

    it('get', async () => {
      api.get('path')
      expect(api.requestJson).toHaveBeenCalledWith('path')
    })

    it('post', () => {
      api.post('path', {data: 'data'}, {header1: 'val'})
      expect(api.requestJson).toHaveBeenCalledWith('path', {method: 'POST', body: {data: 'data'}, headers: {header1: 'val'}})
    })

    it('delete', () => {
      api.delete('path')
      expect(api.requestJson).toHaveBeenCalledWith('path', {method: 'DELETE'})
    })

    it('patch', () => {
      api.patch('path', {data: 'data'})
      expect(api.requestJson).toHaveBeenCalledWith('path', {method: 'PATCH', body: {data: 'data'}})
    })
  })

  it('gives a specific error when failed to parse JSON', () => {
    fetch.mockResolvedValue({
      json: () => {
        throw 'Invalid json'
      }
    })
    return api.requestJson('path', undefined).then(() => {
      throw 'should be rejected'
    }, e => {
      expect(e).to.deep.equal({message: 'errors.notJson'})
    })
  })

  it('gives a network error', () => {
    fetch.mockRejectedValue(new Error('Failed to fetch'))
    return api.requestJson('path').then(() => {
      throw 'should be rejected'
    }, e => {
      expect(e).to.deep.equal({message: 'errors.networkUnavailable'})
    })
  })

  describe('disabling form buttons on submit', () => {
    let form: HTMLFormElement, button: HTMLButtonElement

    beforeEach(() => {
      form = document.createElement('form')
      button = document.createElement('button')
      form.appendChild(button)
      document.body.appendChild(form)
    })

    it('disable any form button', async () => {
      const promise = api.requestJson('path', {method: 'POST'})
      expect(button.disabled).to.be.true
      await promise
      expect(button.disabled).to.be.false
    })

    it('does not disable anything for GET', async () => {
      const promise = api.requestJson('path', {method: 'GET'})
      expect(button.disabled).to.be.false
      await promise
      expect(button.disabled).to.be.false
    })

    it('does not enable disabled buttons', async () => {
      const disabledButton = document.createElement('button')
      disabledButton.disabled = true
      form.appendChild(disabledButton)

      const promise = api.requestJson('path', {method: 'PATCH'})
      expect(disabledButton.disabled).to.be.true
      await promise
      expect(disabledButton.disabled).to.be.true
    })

    it('enable button even if it is removed from DOM', async () => {
      const promise = api.requestJson('path', {method: 'DELETE'})
      expect(button.disabled).to.be.true
      form.removeChild(button)
      await promise
      expect(button.disabled).to.be.false
    })
  })
})
