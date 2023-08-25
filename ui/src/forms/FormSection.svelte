<script lang="ts">
  import Icon from 'src/icons/Icon.svelte'

  export let title = ''
  export let description = ''
  export let icon = ''
</script>

<div class="form-section">
  <div class="col-span-12 md:col-span-4 space-y-1">
    {#if icon}
      <div class="flex gap-1.5 items-start">
        <Icon name={icon} class="mt-px -ml-px"/>
        {#if title}
          <div class="font-bold text-lg leading-tight">{title}</div>
        {/if}
      </div>
    {:else}
      {#if title}
        <div class="font-bold text-lg leading-tight">{title}</div>
      {/if}
    {/if}
    {#if description}
      <div class="text-muted text-xs">{@html description}</div>
    {/if}
  </div>
  <div class="col-span-12 md:col-span-8 space-y-4">
    <slot/>
  </div>
</div>

<style global>
  .form-section {
    @apply grid grid-cols-12 gap-4
  }

  .form-section + .form-section {
    @apply border-t pt-6 mt-6
  }
</style>
