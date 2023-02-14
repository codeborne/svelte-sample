<script lang="ts">
  import NumberField from './NumberField.svelte'
  import {defaultCurrency, formatCurrency} from '../i18n'

  export let label: string | undefined = undefined
  export let value: number | string | undefined
  export let currency = defaultCurrency

  interface $$Events {input: FormEvent; change: FormEvent}
</script>

<NumberField {label} step="any" bind:value unit={formatCurrency(currency)} {...$$restProps} on:change on:input/>
