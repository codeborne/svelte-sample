<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'

  type T = $$Generic

  export let query: string = ''
  export let options: T[] = []
  export let optionMapper: (m: T) => string
  export let onselected: ((t: T) => void) | undefined = undefined

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

  function select(result: T) {
    query = optionMapper(result)
    setTimeout(() => showList = false)
    onselected?.(result)
  }
</script>

<div class="relative">
  <FormField type="search" bind:value={query} onkeydown={navigateList} autocomplete="off" {...$$restProps}
             oninput={() => showList = true} onblur={() => showList = false}>
    <svelte:fragment slot="after"><slot/></svelte:fragment>
  </FormField>

  {#if showList && options.length}
    <div class="absolute rounded-sm shadow-sm bg-white overflow-hidden flex flex-col w-full mt-0 border border-gray-200 text-sm" role="listbox">
      {#each options as o, i}
        <div class="cursor-pointer group border-t"
             role="option"
             tabindex="0"
             onmousedown={() => select(o)}
             onmouseover={() => selectedIndex = i}
             onfocus={() => selectedIndex = i}
             aria-selected={selectedIndex === i}
        >
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
