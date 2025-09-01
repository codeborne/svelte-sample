<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import Icon from 'src/icons/Icon.svelte'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    icon?: string;
    size?: "xs" | "sm" | "";
    selectable?: boolean;
    selected?: boolean;
    children: Snippet;
    onElementSelect?: (e: HTMLElement) => void;
  }

  const {
    icon,
    size = "",
    selectable,
    selected,
    children,
    onElementSelect,
    class: className,
    ...restProps
  }: Props = $props();
  const id = uuidv4();
  const buttonElement = $derived.by(() => (onElementSelect ? document.getElementById(id) : undefined));

  $effect(() => {
    if (selected && buttonElement && onElementSelect) {
      onElementSelect(buttonElement);
    }
  });
</script>

<div {id} role="button" tabindex="0" class="menu-link {size} {className}" class:selected {...restProps}>
  {#if icon || selectable}
    {@const selectableIcon = selected ? "check" : "empty"}
    <Icon name={icon || selectableIcon} {size} class="shrink-0 leading-16" />
  {/if}
  <span class="label">
    {@render children()}
  </span>
</div>

<style lang="postcss">
  @reference "./../global.css";

  .menu-link {
    @apply flex items-start gap-2 px-3 py-2 text-neutral-800 hover:bg-neutral-500/20 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-500/20 dark:hover:text-white;
  }

  .menu-link > :global(.icon) {
    @apply mt-1;
  }

  .label {
    @apply flex-1 font-semibold;
  }

  .selected {
    @apply bg-primary-500 dark:bg-primary-700 hover:bg-primary-400 dark:hover:bg-primary-600 text-white hover:text-white;
  }

  .menu-link.xs {
    @apply gap-1 text-xs;
  }

  .menu-link.xs > :global(.icon) {
    @apply mt-0.25;
  }

  .menu-link.sm {
    @apply gap-1.5 text-sm;
  }

  .menu-link.sm > :global(.icon) {
    @apply mt-0.5;
  }
</style>
