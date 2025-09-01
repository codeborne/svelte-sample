<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from 'src/icons/Icon.svelte'

  interface Props {
    color?: "default" | "primary" | "warning" | "success" | "danger";
    size?: "xs" | "sm" | "" | "lg";
    variant?: "text" | "numeric";
    class?: string;
    icon?: string;
    iconClass?: string;
    children: Snippet;
  }

  const { color = "default", size = "", variant = "text", class: className = "", icon, iconClass, children }: Props = $props();
</script>

<span class="badge {color} {size} {variant} {icon ? 'has-icon' : ''} {className}">
  {#if icon}
    <Icon name={icon} {size} class={iconClass} />
  {/if}
  {@render children()}
</span>

<style lang="postcss">
  @reference "./../global.css";

  .badge {
    @apply inline-flex items-center align-middle rounded-full bg-neutral-200 px-2.5 py-0.5 font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200;
  }

  .badge.xs {
    @apply px-1.5 text-xs leading-tight;
  }

  .badge.sm {
    @apply px-2 text-sm;
  }

  .badge.lg {
    @apply px-3 text-lg leading-normal;
  }

  .badge :global(.icon) {
    @apply -my-1 scale-75;
  }

  .badge.has-icon {
    @apply inline-flex items-center gap-0.25;
  }

  .badge.has-icon:not(.flex-row-reverse) {
    @apply ps-1;
  }

  .badge.flex-row-reverse.has-icon {
    @apply pe-1;
  }

  .badge.primary {
    @apply bg-primary-200 dark:bg-primary-800 dark:text-white;
  }

  .badge.success {
    @apply bg-success-200 dark:bg-success-800 dark:text-white;
  }

  .badge.danger {
    @apply bg-danger-600 text-white;
  }

  .badge.warning {
    @apply bg-warning-300 dark:bg-warning-500 text-warning-950;
  }

  .badge.numeric {
    @apply flex aspect-auto items-center justify-center !px-1 !py-0 tracking-tighter tabular-nums;
    min-width: 1.5em;
  }

  .badge.xs.numeric {
    min-width: 1.25em;
  }

  .badge.sm.numeric {
    min-width: 1.4em;
  }
</style>
