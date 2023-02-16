<script lang="ts">
  import {_} from '@codeborne/i18n-json'

  export let title: string = ''
  export let subtitle: string = ''
  export let padding = 'card-padding py-5'
  export let split = false
</script>

<div class="card bg-white shadow sm:rounded-lg -mx-4 sm:mx-0 {padding} {$$props.class ?? ''}">
  <div class="common-grid md:grid-cols-3">
    {#if title}
      <div class={split ? 'md:col-span-1': 'md:col-span-3'}>
        <h3 class="text-lg font-medium leading-6">{title}</h3>
        {#if subtitle}
          <p class="mt-1 text-sm text-gray-500">{subtitle}</p>
        {/if}
      </div>
    {/if}
    <div class="{title ? 'mt-5 md:mt-0' : ''} {split ? 'md:col-span-2' : 'md:col-span-3'}">
      <slot/>
    </div>
  </div>
</div>

<style global>
  .card-padding {
    @apply px-4 sm:p-6 md:p-8
  }
</style>
