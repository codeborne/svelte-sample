<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: Snippet;
  }

  const { title, children, class: divClass }: Props = $props();
</script>

<div class="menu {divClass || 'w-full min-w-48'}">
  {#if title}
    <div class="px-3">
      <h6 class="text-muted my-1 text-xs font-normal uppercase">{title}</h6>
    </div>
  {/if}
  {@render children()}
</div>

<style lang="postcss">
  @reference "./../global.css";

  .menu {
    @apply grid;
  }
</style>
