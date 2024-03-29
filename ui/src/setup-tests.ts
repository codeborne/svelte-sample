import './shared/ArrayExtensions'
import chai from 'chai'
import en from '../i18n/en.json'
import {initTestTranslations} from './i18n'
import {user} from 'src/stores/auth'
import type {User} from 'src/api/types'
import {Role} from 'src/api/types'

initTestTranslations('en', en)
global.fetch = window.fetch = () => new Promise(() => {})
global.scrollTo = window.scrollTo = () => {}

beforeEach(() => {
  user.set({
    id: 'admin-id',
    firstName: 'Test',
    lastName: 'Admin',
    email: 'admin@codeborne.com',
    role: Role.ADMIN
  } as User)
})

afterEach(() => {
  vi.restoreAllMocks()
})
