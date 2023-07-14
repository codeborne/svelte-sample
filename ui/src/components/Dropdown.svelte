<script lang="ts">
  import {fade} from 'svelte/transition'

  export let open = false
  let dropdown: HTMLElement

  function handleOutsideClick(e: Event) {
    if (open && !dropdown.contains(e.target as HTMLElement)) open = false
  }

  function handleEscape(e: KeyboardEvent) {
    if (open && e.key === 'Escape') open = false
  }
</script>

<svelte:body on:click={handleOutsideClick} on:keyup={handleEscape}/>

<div class="shrink-0 relative md:inline-block" bind:this={dropdown}>
  <div on:click={() => open = !open} role="menu" tabindex="0">
    <slot/>
  </div>

  {#if open}
    <div out:fade|local={{duration: 200}}
         class="dropdown overflow-y-auto {$$props.class ?? ''}"
         role="menu">
      <slot name="open"/>
    </div>
  {/if}
</div>

<style>
  .dropdown {
    @apply origin-top-left min-w-min
    bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden text-sm
    absolute z-10 shadow-lg mt-2 rounded-md py-1
  }
</style>
