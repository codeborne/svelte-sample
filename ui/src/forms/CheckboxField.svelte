<script lang="ts">
  export let label: string|undefined = undefined
  export let checked = false

  export let id = label ? label.replace(/\./g, '-') : ''
</script>

<div class="relative flex items-start {$$props.class }">
  <div class="flex items-center h-5">
    <input {id} type="checkbox" bind:checked {...$$restProps}>
  </div>
  {#if label}
    <div class="ml-3 text-sm">
      <label for={id} class="text-gray-900 mb-0">{label}</label>
    </div>
  {/if}
  <slot/>
</div>

<style lang="postcss" global>
  @reference "./../global.css";

  input[type=checkbox] {
    @apply focus:ring-primary-500 h-4 w-4 text-primary-500 border-gray-300 rounded;
  }
</style>
