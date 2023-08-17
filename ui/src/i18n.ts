import langs from '../i18n/langs.json'
import type {Dict, Options} from '@codeborne/i18n-json'
import {_, formatAmount, formatUuid, init, lang, rememberLang} from '@codeborne/i18n-json'
import {navigate as navigatorNavigate} from 'svelte-navigator'
import type {NavigateOptions} from 'svelte-navigator/types/history'

export * from '@codeborne/i18n-json'

export async function initTranslations(opts?: Partial<Options>, version = window['version']) {
  const lang = location.pathname.match(/^\/[a-z]{2}(\/|$)/) ? location.pathname.substring(1, 3) : undefined
  if (lang) rememberLang(lang)
  await init({langs, lang, fallbackToDefault: import.meta.env.DEV, version, ...opts})
}

export async function initTestTranslations(lang: string, dict: Dict) {
  await init({langs, lang: 'en', dicts: {en: dict}})
}

let date = new Date()
export const today = date.toLocaleDateString('lt')

date.setDate(date.getDate() - 1)
export const yesterday = date.toLocaleDateString('lt')

export const formatId = formatUuid
export function formatTokenAmount(amount: number) {
  return formatAmount(amount) + '\u00A0' + _('general.unit')
}

export function path(to: string) {
  return `/${to}`
}

export function navigate(to: string, opts?: NavigateOptions) {
  navigatorNavigate(path(to), opts)
  setTimeout(() => scrollTo({top: 0}))
}

export const defaultCurrency = 'EUR'
export const defaultVATRate = 1.2
