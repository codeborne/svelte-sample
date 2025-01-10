<script lang="ts">
  import type {Snippet} from 'svelte'

  let {
    title,
    subtitle,
    size = 'md',
    smDownFullWidth = false,
    onclick,
    children,
    ...props
  }: {
    title?: string
    subtitle?: string,
    size?: 'xs' | 'sm' | 'md' | 'lg'
    smDownFullWidth?: boolean
    class?: string
    onclick?: () => void
    children?: Snippet;
  } = $props()
</script>

<div class="card bg-white shadow card-{size} {props.class} {smDownFullWidth ? 'mobile-full-w' : ''}" {onclick}>
  {#if title}
    <div class="card-header">
      <h3 class="card-title">{title}</h3>
      {#if subtitle}
        <p class="mt-1 text-sm text-gray-500">{subtitle}</p>
      {/if}
    </div>
  {/if}
  <div class="card-body card-text">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style lang="postcss" global>
  .card-lg > .card-header > .card-title { @apply text-2xl font-semibold }
  .card-lg > .card-text { @apply text-base }
  .card-lg > .card-header { @apply px-4 py-5 sm:px-8 sm:pt-8 pb-0 }
  .card-lg > .card-body { @apply px-4 py-5 sm:p-8 }

  .card-md > .card-header .card-title { @apply text-lg font-medium leading-6 }
  .card-md > .card-text { @apply text-base }
  .card-md > .card-header { @apply px-4 py-5 sm:px-6 sm:pt-6 pb-0 }
  .card-md > .card-body { @apply px-4 py-5 sm:p-6 }

  .card-sm > .card-header > .card-title { @apply text-base font-medium }
  .card-sm > .card-text { @apply text-sm }
  .card-sm > .card-header { @apply px-4 pt-3 pb-2 pb-0 }
  .card-sm > .card-body { @apply px-4 py-3 }

  .card-xs > .card-header > .card-title { @apply text-sm font-medium }
  .card-xs > .card-text { @apply text-xs }
  .card-xs > .card-header { @apply px-3 py-2 pb-0 }
  .card-xs > .card-body { @apply p-3 }

  .card.mobile-full-w {@apply -mx-4 sm:mx-0 rounded-none}
  .card-lg, .card-md {@apply rounded-lg}
  .card-sm, .card-xs {@apply rounded-md}
  .card.mobile-full-w.card-lg, .card.mobile-full-w.card-md {@apply sm:rounded-lg}
  .card.mobile-full-w.card-sm, .card.mobile-full-w.card-xs {@apply sm:rounded-md}
</style>
