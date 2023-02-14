import {_, detectLang, ensureSupportedLang, formatAmount, formatCurrency, formatDate, formatDateTime, path, rememberLang} from './i18n'

it('translate', () => {
  expect(_('contacts.email')).to.equal('E-mail')
})

it('translate with fallback', () => {
  expect(_('contacts.email', undefined, {contacts: {}})).to.equal('E-mail')
})

it('if translation fails it should return translation key', () => {
  const nonExistingKey = 'some.key.that.does.not.exist'
  expect(_(nonExistingKey)).to.equal(nonExistingKey)
})

it('ensureSupportedLang', () => {
  expect(ensureSupportedLang('en')).to.equal('en')
  expect(ensureSupportedLang('et')).to.equal('et')
  expect(ensureSupportedLang('??')).to.equal('en')
})

it('language is saved to cookie and url is replaced', () => {
  rememberLang('et')
  expect(document.cookie).to.contain('LANG=et')
  expect(detectLang()).to.eq('et')
  rememberLang('en')
  expect(document.cookie).to.contain('LANG=en')
  expect(detectLang()).to.eq('en')
})

it('formatDate', () => {
  expect(formatDate('2021-06-02')).to.eq('02/06/2021')
})

it('formatDateTime', () => {
  expect(formatDateTime(undefined)).to.equal('')
  expect(formatDateTime(new Date())).to.contain(new Date().getFullYear().toString())
  expect(formatDateTime(123)).to.contain('1970')
  expect(formatDateTime('2020-01-01T10:23:45.010101')).to.eq('1/01/2020, 10:23:45')
})

it('formatAmount', () => {
  expect(formatAmount({amount: 123, currency: 'EUR'})).to.eq('€123.00')
  expect(formatAmount(456.567, 'GBP')).to.eq('£456.57')
  expect(formatAmount(null as any, 'EUR')).to.eq('€0.00')
})

it('formatCurrency', () => {
  expect(formatCurrency('EUR')).to.eq('€')
  expect(formatCurrency('USD')).to.eq('US$')
})

it('adds slash to paths', () => {
  expect(path('')).to.eq('/')
  expect(path('dashboard')).to.eq('/dashboard')
})
