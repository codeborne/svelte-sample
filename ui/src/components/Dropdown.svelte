<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Snippet } from "svelte";

  interface Props {
    open?: boolean;
    class?: string;
    wrapperClass?: string;
    openerClass?: string;
    children: Snippet;
    menu: Snippet<[() => void]>;
  }

  let {
    open = $bindable(false),
    class: dropdownClass = "",
    wrapperClass = "shrink-0 relative md:inline-block",
    openerClass = "",
    children,
    menu,
  }: Props = $props();

  let wrapper: HTMLElement;

  function handleOutsideClick(e: Event) {
    if (open && !wrapper.contains(e.target as HTMLElement)) {
      open = false;
    }
  }

  function handleEscape(e: KeyboardEvent) {
    if (open && e.key === "Escape") {
      open = false;
    }
  }

  function handleSpace(e: KeyboardEvent) {
    if (e.key === " ") {
      open = !open;
    }
  }

  export function close() {
    open = false;
  }
</script>

<svelte:body on:click={handleOutsideClick} on:keyup={handleEscape} />

<div class={wrapperClass} bind:this={wrapper}>
  <div onclick={() => (open = !open)} onkeyup={handleSpace} role="menu" tabindex="0" class={openerClass}>
    {@render children()}
  </div>

  {#if open}
    <div out:fade|local={{ duration: 200 }} class="dropdown overflow-y-auto {dropdownClass}" role="menu">
      {@render menu(close)}
    </div>
  {/if}
</div>

<style lang="postcss">
  .dropdown {
    @apply origin-top-left min-w-min
    bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden text-sm
    absolute z-10 shadow-lg mt-2 rounded-md py-1;
  }
</style>
