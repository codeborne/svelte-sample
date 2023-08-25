<script lang="ts">
  import FormField from './FormField.svelte'
  import countries from 'i18n/countries.json'
  import type {CountryCode} from 'src/api/types'

  export let label: string|undefined = undefined
  export let value: string = ''
  export let required = true
  export let countryCode = ''

  interface $$Events {}

  $: areaCode = countries[countryCode as CountryCode]?.phoneAreaCode
  $: if (areaCode && value?.startsWith(areaCode)) value = '+' + value
  $: areaPrefix = areaCode ? '+' + areaCode : ''

  async function focus(e: FormEvent) {
    if (!value) {
      value = areaPrefix
      setTimeout(() => e.currentTarget?.setSelectionRange(value.length, value.length))
    }
  }

  function blur() {
    if (value == areaPrefix) value = ''
  }

  function paste(e: ClipboardEvent) {
    e.preventDefault()
    const pasted = (e.clipboardData || e.clipboardData)?.getData('text') ?? ''
    value = (pasted.startsWith("+") ? '' : areaPrefix) + pasted
  }
</script>

<FormField type="tel" on:paste={paste} bind:value {label} on:focus={focus} on:blur={blur} minlength={10} maxlength={15} {required} {...$$restProps}/>
