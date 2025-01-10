<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    color?: "default" | "warning" | "success" | "danger";
    size?: "xs" | "sm" | "" | "lg";
    children: Snippet;
  }

  const { color = "default", size = "", children }: Props = $props();
</script>

<span class="badge {color} {size}">
  {@render children()}
</span>

<style lang="postcss">
  .badge {
    @apply bg-primary-100 text-primary-950 inline-flex items-center rounded-full px-3 py-0.5 font-medium;
  }

  .badge.xs {
    @apply px-2 text-xs leading-tight;
  }

  .badge.sm {
    @apply px-2.5 text-sm;
  }

  .badge.lg {
    @apply px-3.5 text-lg;
  }

  .badge.success {
    @apply bg-success text-primary-50;
  }

  .badge.danger {
    @apply bg-danger text-primary-50;
  }

  .badge.warning {
    @apply bg-warning text-primary-950;
  }
</style>
