<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'
  import {createEventDispatcher} from 'svelte'

  type T = $$Generic

  export let query: string = ''
  export let options: T[] = []
  export let optionMapper: (m: T) => string

  let selectedIndex = -1
  let showList = false
  $: if (!query) selectedIndex = -1

  function navigateList(e: KeyboardEvent) {
    if (!options.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (++selectedIndex >= options.length) selectedIndex = options.length - 1
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (--selectedIndex < -1) selectedIndex = -1
    } else if (e.key === 'Enter' && showList && selectedIndex >= 0) {
      e.preventDefault()
      select(options[selectedIndex])
    }
  }

  const dispatch = createEventDispatcher<{selected: T}>()

  function select(result: T) {
    query = optionMapper(result)
    setTimeout(() => showList = false)
    dispatch('selected', result)
  }
</script>

<div class="relative">
  <FormField type="search" bind:value={query} on:keydown={navigateList} autocomplete="off" {...$$restProps}
             on:input={() => showList = true} on:blur={() => showList = false}>
    <svelte:fragment slot="after"><slot/></svelte:fragment>
  </FormField>

  {#if showList && options.length}
    <div class="absolute rounded shadow bg-white overflow-hidden flex flex-col w-full mt-0 border border-gray-200 text-sm">
      {#each options as o, i}
        <div class="cursor-pointer group border-t"
             on:mousedown={() => select(o)}
             on:mouseover={() => selectedIndex = i} on:focus={() => {}}>
          <div class="block p-2 border-transparent border-l-4"
               class:border-primary-600={i === selectedIndex}
               class:bg-gray-100={i === selectedIndex}>
            {optionMapper(o)}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
