<script lang="ts">
  import {t} from 'src/i18n'

  export let label: string|undefined = undefined
  export let helpText = ''
  export let value: string|number = ''
  export let validator: ((value: string) => string)|undefined = undefined
  export let id = label?.replace(/\./g, '-')

  export let minlength = 0
  export let maxlength = 100
  export let required = true

  let input: HTMLInputElement
  $: if (input && validator) input.setCustomValidity(validator(value as string))
</script>

<div class="form-field {$$props.class}">
  {#if label}
    <label for={id}>
      {label}
      {#if helpText}<span class="help-text" title={helpText}>ⓘ</span>{/if}
      {#if !required}<span class="text-muted">({t.general.optional})</span>{/if}
    </label>
  {/if}
  <slot {id}>
    <div class="flex relative">
      <input {id} bind:this={input} bind:value {minlength} {maxlength} {required} {...$$restProps} class="">
      <slot name="after"/>
    </div>
  </slot>
</div>

<style lang="postcss" global>
  @reference "./../global.css";

  label {
    @apply block text-sm font-medium text-gray-700;
  }

  .form-field label {
    @apply mb-1;
  }

  .form-field input, .form-field select, .form-field textarea {
    @apply block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm focus:outline-hidden focus:ring-primary-500 focus:ring-1 focus:border-primary-500 disabled:bg-gray-100;
  }

  .form-field.lg input, .form-field.lg select, .form-field.lg textarea {
    @apply text-lg;
  }
</style>
