<script lang="ts">
  import {_} from '@codeborne/i18n-json'

  export let title: string = ''
  export let subtitle: string = ''
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md'
  export let split = false
  export let smDownFullWidth = false
</script>

<div class="card bg-white shadow card-{size} {split ? 'card-split' : ''} {$$props.class ?? ''} {smDownFullWidth ? 'mobile-full-w' : ''}"
     on:click>
  <div class="grid md:grid-cols-3">
    {#if title}
      <div class="card-header {split ? 'md:col-span-1': 'md:col-span-3'}">
        <h3 class="card-title">{title}</h3>
        {#if subtitle}
          <p class="mt-1 text-sm text-gray-500">{subtitle}</p>
        {/if}
      </div>
    {/if}
    <div class="card-body card-text {title && split ? 'md:col-span-2' : 'md:col-span-3'}">
      <slot/>
    </div>
  </div>
</div>

<style global>
  .card-lg > .grid > .card-header > .card-title { @apply text-2xl font-semibold }
  .card-lg > .grid > .card-text { @apply text-base }
  .card-lg > .grid > .card-header { @apply px-4 py-5 sm:px-8 sm:pt-8 pb-0 }
  .card-lg > .grid > .card-body { @apply px-4 py-5 sm:p-8 }
  .card-lg.card-split > .grid > .card-header { @apply sm:p-8 }

  .card-md > .grid > .card-header .card-title { @apply text-lg font-medium leading-6 }
  .card-md > .grid > .card-text { @apply text-base }
  .card-md > .grid > .card-header { @apply px-4 py-5 sm:px-6 sm:pt-6 pb-0 }
  .card-md > .grid > .card-body { @apply px-4 py-5 sm:p-6 }
  .card-md.card-split > .grid > .card-header { @apply sm:p-6 }

  .card-sm > .grid > .card-header > .card-title { @apply text-base font-medium }
  .card-sm > .grid > .card-text { @apply text-sm }
  .card-sm > .grid > .card-header { @apply px-4 pt-3 pb-2 pb-0 }
  .card-sm > .grid > .card-body { @apply px-4 py-3 }
  .card-sm.card-split > .grid > .card-header { @apply sm:p-4 }

  .card-xs > .grid > .card-header > .card-title { @apply text-sm font-medium }
  .card-xs > .grid > .card-text { @apply text-xs }
  .card-xs > .grid > .card-header { @apply px-3 py-2 pb-0 }
  .card-xs > .grid > .card-body { @apply p-3 }
  .card-xs.card-split > .grid > .card-header { @apply sm:p-3 }

  .card.mobile-full-w {@apply -mx-4 sm:mx-0 rounded-none}
  .card-lg, .card-md {@apply rounded-lg}
  .card-sm, .card-xs {@apply rounded-md}
  .card.mobile-full-w.card-lg, .card.mobile-full-w.card-md {@apply sm:rounded-lg}
  .card.mobile-full-w.card-sm, .card.mobile-full-w.card-xs {@apply sm:rounded-md}
</style>
