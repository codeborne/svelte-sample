<script lang="ts">
  import {_} from 'src/i18n'

  export let label: string|undefined = undefined
  export let checked = false

  export let id = label ? label.replace(/\./g, '-') : ''

  interface $$Events {change: FormEvent}
</script>

<div class="relative flex items-start {$$props.class ?? ''}">
  <div class="flex items-center h-5">
    <input {id} type="checkbox" bind:checked on:change {...$$restProps}>
  </div>
  {#if label}
    <div class="ml-3 text-sm">
      <label for={id} class="text-gray-900 mb-0">{_(label)}</label>
    </div>
  {/if}
  <slot/>
</div>

<style global>
  input[type=checkbox] {
    @apply focus:ring-primary-500 h-4 w-4 text-primary-500 border-gray-300 rounded
  }
</style>
