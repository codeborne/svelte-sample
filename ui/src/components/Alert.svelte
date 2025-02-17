<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    color?: "default" | "warning" | "success" | "danger";
    size?: "xs" | "sm" | "" | "lg";
    children: Snippet;
  }

  const { color = "default", size = "", children }: Props = $props();
</script>

<div class="alert {color} {size}" role="alert">
  {@render children()}
</div>

<style lang="postcss">
  @reference "./../global.css";

  .alert {
    @apply relative border-l-2 border-neutral-400 bg-neutral-200 px-4 py-3 font-medium dark:border-neutral-600 dark:bg-neutral-800;
  }

  .alert.success {
    @apply bg-success-100 text-success-700 border-success-300;
  }

  .alert.warning {
    @apply bg-warning-100 text-warning-700 border-warning-300;
  }

  .alert.danger {
    @apply bg-danger-100 text-danger-700 border-danger-300;
  }

  .alert.sm {
    @apply border-l-2 px-3 py-2 text-sm;
  }

  .alert.lg {
    @apply border-l-4 px-5 py-4;
  }
</style>
