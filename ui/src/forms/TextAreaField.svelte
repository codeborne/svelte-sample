<script lang="ts">
  import {t} from 'src/i18n'
  import FormField from 'src/forms/FormField.svelte'

  export let label: string|undefined = undefined
  export let value: string = ''
  export let maxlength = 1000
  export let rows = (value?.split('\n').length ?? 0) + 1
  export let inBytes = false
  export let required = true

  const encoder = new TextEncoder()

  let textarea: HTMLTextAreaElement
  $: tooLong = inBytes ? encoder.encode(value).length > maxlength : value?.length > maxlength
  $: textarea?.setCustomValidity(tooLong ? t.errors.tooLong : '')

  $: {
    const lines = value?.split('\n').length ?? 0
    if (lines > rows) rows = lines
  }
</script>

<FormField {label} let:id>
  <div class="float-right text-sm -mt-6" class:text-red-500={tooLong}>
    {#if inBytes}
      <span title="bytes">{encoder.encode(value).length ?? 0} / {maxlength}</span>
    {:else}
      {value?.length ?? 0} / {maxlength}
    {/if}
  </div>
  <textarea {id} bind:this={textarea} bind:value {rows} {required} {...$$restProps}></textarea>
</FormField>
