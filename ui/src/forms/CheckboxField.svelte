<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends HTMLInputAttributes {
    label?: string;
    checked?: boolean;
    renderAsToggle?: boolean;
  }

  let {
    label = "",
    checked = $bindable(false),
    renderAsToggle = false,
    disabled,
    ...restProps
  }: Props = $props();

  const id = label.replace(/\./g, "-");
</script>

<div class="{renderAsToggle ? 'toggle-switch' : ''} relative flex items-start {disabled ? 'disabled' : ''}">
  <div class="check-container flex items-center">
    <input {id} type="checkbox" bind:checked {...restProps} />
    {#if renderAsToggle}
      <div class="line"></div>
      <div class="dot"></div>
    {/if}
  </div>
  {#if label}
    <label for={id} class="mb-0">{label}</label>
  {/if}
</div>

<style lang="postcss">
  @reference "./../global.css";

  input {
    @apply h-4 w-4 rounded border-neutral-300 text-neutral-500 focus:border-neutral-500 focus:ring-neutral-500 disabled:border-neutral-200 disabled:bg-neutral-100;
  }

  label {
    @apply ml-2 text-sm leading-tight;
  }

  .disabled label {
    @apply opacity-50;
  }

  .toggle-switch {
    @apply flex cursor-pointer items-center;
  }

  .toggle-switch .check-container {
    @apply relative;
  }

  .toggle-switch.disabled .check-container {
    @apply opacity-50;
  }

  .toggle-switch input {
    @apply relative h-6 w-10 opacity-0;
  }

  .toggle-switch .dot,
  .toggle-switch .line {
    @apply pointer-events-none absolute;
  }

  .toggle-switch .dot {
    @apply pointer-events-none top-1 left-1 h-4 w-4 rounded-full bg-white opacity-70 transition;
  }

  .toggle-switch .line {
    @apply pointer-events-none left-0 h-6 w-10 rounded-full bg-neutral-600/50;
  }

  .toggle-switch input:checked ~ .dot {
    @apply translate-x-full opacity-100;
  }

  .toggle-switch input:checked ~ .line {
    @apply bg-success-500;
  }

  .toggle-switch input:focus ~ .line {
    @apply ring-2 ring-neutral-500 ring-offset-2 outline-hidden;
  }
</style>
