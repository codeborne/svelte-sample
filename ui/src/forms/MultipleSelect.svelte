<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'
  import Badge from 'src/components/Badge.svelte'
  import Icon from 'src/components/Icon.svelte'
  import PlusSelectField from 'src/components/PlusSelectField.svelte'
  import {createEventDispatcher} from 'svelte'

  export let label = ''
  export let values: string[]
  export let options: {[value: string|number]: string|number} | string[] | string | undefined

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
      <Badge>{options?.[key]} <a on:click={() => remove(key)}><Icon name="x"/></a></Badge>
    {/each}
    <PlusSelectField {options} {values} bind:select on:change={add}/>
  </div>
</FormField>
