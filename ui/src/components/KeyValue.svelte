<script lang="ts">
  import {_} from 'src/i18n'

  export let label: string
  export let value: string|number|undefined = undefined
  export let valueClass = ''
</script>

{#if value || $$slots.default}
  <div class="key-value-pair {$$props.class ?? ''}">
    <p class="key">{_(label)}</p>
    <p class="value {valueClass}">
      {#if value}{value}{:else}<slot/>{/if}
    </p>
  </div>
{/if}

<style>
  .key {
    @apply text-gray-400 text-xs
  }

  .value {
    @apply font-medium
  }
</style>
