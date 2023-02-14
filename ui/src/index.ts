import './shared/ArrayExtensions'
import './global.css'
import api from 'src/api/api'
import {initTranslations} from './i18n'
import {initErrorHandlers} from './errorHandlers'
import App from './App.svelte'
import {initSession} from 'src/stores/auth'
import type {AuthenticatedUser} from 'src/api/types'

(async function() {
  initErrorHandlers()

  const [auth] = await Promise.all([api.get('user').catch(() => null), initTranslations()])
  if (auth) initSession(auth as AuthenticatedUser)

  document.body.innerHTML = ''
  new App({target: document.body})
}())
