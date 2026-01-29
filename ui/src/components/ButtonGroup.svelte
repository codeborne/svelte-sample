<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
  }

  const { children, class: className = "" }: Props = $props();
</script>

<div class="btn-group {className}">
  {@render children()}
</div>

<style lang="postcss">
  @reference "./../global.css";

  .btn-group {
    @apply flex flex-nowrap;
  }

  .btn-group > :global(.btn) {
    @apply flex-grow focus:z-10 focus:ring-offset-0;
  }

  .btn-group > :global(.btn:not(:first-child)) {
    @apply rounded-s-none!;
  }

  .btn-group > :global(.btn:not(:last-child)) {
    @apply rounded-e-none!;
  }

  .btn-group > :global(.btn:not(:first-child)) {
    @apply -ms-px border-s!;
  }

  .btn-group > :global(.btn.primary:not(:first-child):not(.outlined)),
  .btn-group > :global(.btn.secondary:not(:first-child):not(.outlined)) {
    @apply border-s-transparent;
  }
</style>
