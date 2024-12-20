<script lang="ts">
  import FormField from './FormField.svelte'
  import countries from 'i18n/countries.json'
  import type {CountryCode} from 'src/api/types'

  export let label: string|undefined = undefined
  export let value: string = ''
  export let required = true
  export let countryCode = ''

  $: areaCode = countries[countryCode as CountryCode]?.phoneAreaCode
  $: if (areaCode && value?.startsWith(areaCode)) value = '+' + value
  $: areaPrefix = areaCode ? '+' + areaCode : ''

  async function onfocus(e: FormEvent) {
    if (!value) {
      value = areaPrefix
      setTimeout(() => e.currentTarget?.setSelectionRange(value.length, value.length))
    }
  }

  function onblur() {
    if (value == areaPrefix) value = ''
  }

  function onpaste(e: ClipboardEvent) {
    e.preventDefault()
    const pasted = (e.clipboardData || e.clipboardData)?.getData('text')
    value = (pasted?.startsWith("+") ? '' : areaPrefix) + pasted
  }
</script>

<FormField type="tel" {onpaste} bind:value {label} {onfocus} {onblur} minlength={10} maxlength={15} {required} {...$$restProps}/>
