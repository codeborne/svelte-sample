const sveltePreprocess = require('svelte-preprocess')

const warningsToIgnore = [
  'a11y-autofocus',
  'a11y-no-onchange',
  'a11y-missing-attribute',
  'a11y-label-has-associated-control',
  'a11y-click-events-have-key-events',
  'security-anchor-rel-noreferrer'
]

const preprocess = sveltePreprocess({
  postcss: true,
  typescript: {compilerOptions: {target: 'es2020'}}
})

module.exports = {
  compilerOptions: {
    accessors: true
  },
  preprocess,
  onwarn: (warning, handler) => {
    if (warningsToIgnore.includes(warning.code)) return
    handler(warning)
  }
}
