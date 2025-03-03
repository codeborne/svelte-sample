<script>
  import {slide} from 'svelte/transition'
  import TreeNavLink from 'src/components/TreeNavLink.svelte'
  import Icon from 'src/icons/Icon.svelte'

  export let expanded = false
  export let label
  export let children

  function toggle() {
    expanded = !expanded
  }
</script>

<div>
  <a href={'#'}
     class:expanded
     on:click|preventDefault={toggle}
     class="flex items-center rounded-sm hover:bg-neutral-50 py-1 font-semibold"
  >
    <div class="transition-all duration-200 {expanded ? 'rotate-90' : 'rotate-0'}">
      <Icon name="chevron-right" />
    </div>
    <span>{label}</span>
  </a>

  {#if expanded}
    <ul transition:slide={{duration: 100}}>
      {#each children as child}
        <li>
          {#if child.children}
            <svelte:self {...child}/>
          {:else}
            <TreeNavLink {...child}/>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="postcss">
  @reference "./../global.css";

  ul {
    @apply px-3 py-0 my-0;
  }

  li {
    @apply ml-1;
  }
</style>
