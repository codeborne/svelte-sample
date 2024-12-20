<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'
  import Badge from 'src/components/Badge.svelte'
  import Icon from 'src/icons/Icon.svelte'
  import PlusSelectField from './PlusSelectField.svelte'

  export let label = ''
  export let values: string[]
  export let options: {[value: string|number]: string|number} | string[] | string | undefined
  export let disabled = false
  export let onchange: ((values: string[]) => void) | undefined = undefined

  let select: HTMLSelectElement

  function remove(id: string) {
    values = values.filter(v => v != id)
    onchange?.(values)
  }

  function add() {
    values = [...values ?? [], select.value]
    onchange?.(values)
  }

  $: if (values) setTimeout(() => {if (select) select.selectedIndex = 0})
</script>

<FormField {label}>
  <div class="flex flex-row flex-wrap items-center gap-2">
    {#each values ?? [] as key}
      <Badge>{options?.[key]} {#if !disabled}<button onclick={() => remove(key)} class="ml-1"><Icon name="x"/></button>{/if}</Badge>
    {/each}
    {#if !disabled}
      <PlusSelectField {options} {values} bind:select onchange={add}/>
    {/if}
  </div>
</FormField>
