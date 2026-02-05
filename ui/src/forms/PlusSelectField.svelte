<script lang="ts">
  import SelectField from 'src/forms/SelectField.svelte'

  export let values: string[]
  export let options: {[value: string|number]: string|number} | string[] | string | undefined

  export let select: HTMLSelectElement
  const selectId = Math.random().toString()

  $: filteredOptions = Object.entries(options ?? {}).filter(o => !values?.includes(o[0]))
</script>

{#if filteredOptions.length}
  <SelectField id={selectId} bind:select options={filteredOptions.toObject()} value="" emptyOption="+" required={false} selectClass="!py-1 !pl-2.5" {...$$restProps}/>
{/if}
