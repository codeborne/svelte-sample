import langs from '../i18n/langs.json'
import {defaultLang, detectLang, type Dict, init, langs as allLangs, mergeDicts, type Options, rememberLang, resolve} from '@codeborne/i18n-json'
import {navigate as navigatorNavigate} from 'svelte-routing'
import type enDict from 'i18n/en.json'

export * from '@codeborne/i18n-json'

export const dt = resolve
export let t = {} as typeof enDict

export async function initTranslations(opts?: Partial<Options>) {
  allLangs.splice(0, 1, ...langs)
  let lang = location.pathname.match(/^\/[a-z]{2}(\/|$)/) ? location.pathname.substring(1, 3) : undefined
  if (lang) rememberLang(lang)
  else lang = detectLang(() => navigator.languages?.find(l => l.startsWith('et')) ? 'et' : undefined)
  const promise = lang == 'et' ? import('i18n/et.json') :
    lang == 'ru' ? import('i18n/ru.json') :
      import('i18n/en.json')
  let dict = await promise as unknown as typeof enDict
  if (import.meta.env.DEV && lang != defaultLang) {
    dict = JSON.parse(JSON.stringify(dict))
    mergeDicts(dict, await import('i18n/en.json') as typeof enDict)
  }
  t = dict
  await init({langs, lang, dicts: {[lang]: dict}, ...opts})
}

export async function initTestTranslations(lang: string, dict: Dict) {
  t = await import('i18n/en.json') as typeof enDict
  await init({langs, lang, dicts: {en: dict}})
}

let date = new Date()
export const today = date.toLocaleDateString('lt')

date.setDate(date.getDate() - 1)
export const yesterday = date.toLocaleDateString('lt')

date.setDate(date.getDate() + 2)
export const tomorrow = date.toLocaleDateString('lt')

export function path(to: string) {
  return `/${to}`
}

let refreshNavigate = false
export function refreshOnNextNavigate() {
  refreshNavigate = true
}

export function navigate(to: string, opts?: object) {
  if (refreshNavigate) return location.href = path(to)
  navigatorNavigate(path(to), opts)
  setTimeout(() => scrollTo({top: 0}))
}

export const defaultCurrency = 'EUR'
