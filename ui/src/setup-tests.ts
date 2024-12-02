import './shared/ArrayExtensions'
import en from '../i18n/en.json'
import {initTestTranslations} from './i18n'
import {user} from 'src/stores/auth'
import type {User} from 'src/api/types'
import {Role} from 'src/api/types'

initTestTranslations('en', en)
window.fetch = () => new Promise(() => {})
window.scrollTo = () => {}

// not provided by jsdom
Element.prototype.animate = (() => ({cancel: () => {}})) as any

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
