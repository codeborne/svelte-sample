<script lang="ts">
  import FormField from './FormField.svelte'

  export let label: string|undefined = undefined
  export let value: string = ''
  export let required = true

  const prefix = 'https://'

  async function onfocus(e: FormEvent) {
    if (!value) {
      value = prefix
      setTimeout(() => e.currentTarget?.setSelectionRange(value.length, value.length))
    }
  }

  function onblur() {
    if (value == prefix) value = ''
    value = value.replace(/#.*$/, '')
    if (value && !value.includes('://')) value = prefix + value
  }
</script>

<FormField type="url" bind:value {label} {onfocus} {onblur} maxlength={500} autocomplete="off" {required} {...$$restProps}/>
