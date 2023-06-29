<script lang="ts">
  import {_} from '../i18n'
  import Badge from './Badge.svelte'

  export let labelPrefix: string = ''
  export let items: Record<string, number|undefined>
  export let selected: string = Object.keys(items).first()
</script>

<div class="spaced">
  <div class="md:flex md:flex-wrap md:space-x-3">
    {#each Object.entries(items) as [name, value]}
      <a on:click={() => selected = name} class="{selected === name ? 'active' : 'inactive'} group menu-item" role="tab" tabindex="0">
        <span>{_((labelPrefix && labelPrefix + '.') + name)}</span>
        {#if value !== undefined}
          <Badge class="{selected === name ? 'bg-white': 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'} ml-2 inline-block">{value}</Badge>
        {/if}
      </a>
    {/each}
  </div>

  <div>
    <slot/>
  </div>
</div>

<style>
  .menu-item {
    @apply flex items-center px-3 py-2 text-sm font-medium rounded-md
  }
  .active {
    @apply bg-gray-100 text-gray-900
  }
  .inactive {
    @apply text-gray-600 hover:bg-white hover:text-gray-900
  }
</style>
