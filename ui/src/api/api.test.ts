import api, {headers} from './api'
import type {SinonStub} from 'sinon'
import {stub, useFakeTimers} from 'sinon'
import {toastStore} from '../stores/toasts'
import {get} from 'svelte/store'
import {_} from 'src/i18n'

const successfulResponse = {status: 200, headers: {get: () => undefined}, json: () => 'data'} as any

describe('api', () => {
  let fetch: SinonStub

  beforeEach(() => {
    fetch = stub(global, 'fetch').resolves(successfulResponse)
  })

  it('extracts json', async () => {
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(document.documentElement.classList.contains('loading')).to.equal(true)
    expect(fetch).calledWith('/api/path', {headers, body: '{"data":"data"}'})
    expect(await promise).to.equal('data')
    expect(document.documentElement.classList.contains('loading')).to.equal(false)
  })

  it('offers to refresh if version mismatch', async () => {
    const clock = useFakeTimers()
    window['apiVersion'] = '2.3'
    fetch.resolves({...successfulResponse, headers: {get: () => '2.2'}})
    await api.requestJson('path', {body: {data: 'data'}})
    expect(get(toastStore)).to.be.empty

    clock.tick(10000)
    expect(get(toastStore)[0]?.title).to.eq(_('home.apiVersionUpdate.title'))
    clock.restore()
    window['apiVersion'] = undefined
  })

  it('supports null json response', async () => {
    fetch.resolves({...successfulResponse, json: () => null})
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(await promise).to.be.null
  })

  it('supports No Content response', async () => {
    fetch.resolves({...successfulResponse, status: 204, text: () => ''})
    const promise = api.requestJson('path', {body: {data: 'data'}})
    expect(await promise).to.eq('')
  })

  it('handles http error', () => {
    fetch.resolves({status: 403, json: () => Promise.resolve({statusCode: 403, message: '', reason: 'Forbidden'})})
    return api.requestJson('path', {headers}).then(() => {
      throw 'should be rejected'
    }, e => {
      expect(e).to.deep.equal({statusCode: 403, message: 'Forbidden', reason: 'Forbidden'})
      expect(document.documentElement.classList.contains('loading')).to.be.false
    })
  })

  describe('requests', () => {
    let requestJson: SinonStub
    beforeEach(() => requestJson = stub(api, 'requestJson'))

    it('get', () => {
      api.get('path')
      expect(requestJson).calledWith('path')
    })

    it('post', () => {
      api.post('path', {data: 'data'}, {header1: 'val'})
      expect(requestJson).calledWith('path', {method: 'POST', body: {data: 'data'}, headers: {header1: 'val'}})
    })

    it('delete', () => {
      api.delete('path')
      expect(requestJson).calledWith('path', {method: 'DELETE'})
    })

    it('patch', () => {
      api.patch('path', {data: 'data'})
      expect(requestJson).calledWith('path', {method: 'PATCH', body: {data: 'data'}})
    })
  })

  it('gives a specific error when failed to parse JSON', () => {
    fetch.resolves({
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
    fetch.rejects(new Error('Failed to fetch'))
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
