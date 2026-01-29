<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    class?: string;
    children: Snippet;
  }

  const { title, class: extraClasses = "", children, ...restProps }: Props = $props();
</script>

<div class="sub-section grid gap-2">
  {#if title}
    <div class="text-xs text-neutral-600 uppercase dark:text-neutral-400">{title}</div>
  {/if}
  <div class={extraClasses} {...restProps}>
    {@render children()}
  </div>
</div>

<style lang="postcss">
  @reference "./../global.css";

  .sub-section + :global(.sub-section) {
    @apply mt-4;
  }
</style>
