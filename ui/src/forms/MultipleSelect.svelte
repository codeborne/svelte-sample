<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'
  import Badge from 'src/components/Badge.svelte'
  import Icon from 'src/icons/Icon.svelte'
  import PlusSelectField from './PlusSelectField.svelte'
  import {createEventDispatcher} from 'svelte'

  export let label = ''
  export let values: string[]
  export let options: {[value: string|number]: string|number} | string[] | string | undefined
  export let disabled = false

  let select: HTMLSelectElement

  const dispatch = createEventDispatcher<{change: string[]}>()

  function remove(id: string) {
    values = values.filter(v => v != id)
    dispatch('change', values)
  }

  function add() {
    values = [...values ?? [], select.value]
    dispatch('change', values)
  }

  $: if (values) setTimeout(() => {if (select) select.selectedIndex = 0})
</script>

<FormField {label}>
  <div class="flex flex-row flex-wrap items-center gap-2">
    {#each values ?? [] as key}
      <Badge>{options?.[key]} {#if !disabled}<a on:click={() => remove(key)}><Icon name="x"/></a>{/if}</Badge>
    {/each}
    {#if !disabled}
      <PlusSelectField {options} {values} bind:select on:change={add}/>
    {/if}
  </div>
</FormField>
