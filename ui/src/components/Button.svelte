<script lang="ts">
  import {_} from '../i18n'
  import Icon from './Icon.svelte'
  import type icons from 'src/components/icons'

  export let icon: keyof typeof icons|undefined = undefined
  export let size: 'sm'|''|'lg' = ''
  export let label = ''
  export let type: 'button'|'submit' = 'button'

  $: hasLabel = label || $$slots.default
</script>

<button {type} {...$$restProps} class="btn {$$props.class ?? 'default'} {size} {icon ? 'inline-flex items-center' : ''}" class:icon-only={icon && !hasLabel} on:click>
  {#if icon}
    <Icon name={icon} class={size == 'lg' ? 'icon-lg' : size == 'sm' ? 'icon-sm' : ''}/>
  {/if}
  {#if hasLabel}
    <span class:ml-2={icon}><slot>{_(label)}</slot></span>
  {/if}
</button>

<style global>
  .btn {
    @apply border border-transparent rounded-md text-center inline-flex
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75
           disabled:opacity-50 justify-center py-2 px-4 text-sm font-medium
  }

  .btn.default {
    @apply focus:ring-primary-500 hover:bg-gray-50 bg-white text-gray-700 border border-gray-300
  }

  .btn.primary {
    @apply text-white hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500
  }

  .btn.danger {
    @apply text-danger-500 border border-gray-300 hover:bg-gray-50
  }

  .btn.success {
    @apply text-white hover:text-white bg-success-400 hover:bg-success-700 focus:ring-success-500
  }

  .btn.link {
    @apply text-primary-600 hover:text-primary-500 hover:bg-primary-100 focus:ring-primary-400
  }

  .btn.sm {
    @apply py-1.5 px-3
  }

  .btn.lg {
    @apply py-3 px-4 font-semibold
  }

  .btn.icon-only {
    @apply px-2
  }

  .btn.icon-only.sm {
    @apply px-1.5
  }
</style>
