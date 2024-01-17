<script lang="ts">

  import Icon from 'src/icons/Icon.svelte'

  export let position: 'right' | 'bottom-right' = 'right'
  export let title = ''

  export let icon = 'settings-automation'
</script>

<div class="fixed z-50 transition ease-in-out
          opacity-60 hover:opacity-100
          {position}
">
  <div class="grid gap-2 p-3 rounded-l shadow-lg bg-white">
    {#if icon}
      <div>
        <Icon name={icon} class="text-muted"/>
      </div>
    {/if}
    {#if title}
      <strong>{title}</strong>
    {/if}
    <slot/>
  </div>
</div>

<style>
  .right {
    @apply right-0 top-1/2 my-6 translate-x-3/4 hover:translate-x-0 w-[200px];
  }

  .right > div {
    @apply -translate-y-1/2
  }

  .bottom-right {
    @apply right-0 bottom-0 mx-6;
  }
</style>
