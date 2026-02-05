<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import Button from "./Button.svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    bodyClass?: string;
    size?: "xs" | "sm" | "" | "lg";
    onBack?: () => void;
    actions?: Snippet;
    children?: Snippet;
    footer?: Snippet;
  }

  const { title = "", bodyClass = "", size = "", onBack, actions, children, footer, ...restProps }: Props = $props();
</script>

<div class="panel {size} {restProps.class ?? ''}">
  {#if title || actions}
    <div class="panel-header">
      {#if onBack}
        <div class="panel-back">
          <Button onclick={onBack} size="sm" icon="arrow-left" variant="outlined" circular />
        </div>
      {/if}
      <div class="grow">
        <div class="panel-title">{title}</div>
      </div>
      {#if actions}
        <div class="panel-actions">
          {@render actions()}
        </div>
      {/if}
    </div>
  {/if}
  <div class="panel-body">
    <div class="panel-scroller {bodyClass || ''}">
      {@render children?.()}
    </div>
  </div>
  {#if footer}
    <div class="panel-footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "./../global.css";

  .panel {
    @apply flex h-full w-full flex-col divide-y bg-neutral-50 dark:bg-neutral-950;
  }

  .panel-header {
    @apply flex flex-wrap items-center justify-between p-4 sm:flex-nowrap;
  }

  .panel-footer {
    @apply px-4 py-2 empty:hidden;
  }

  .panel-title {
    @apply font-semibold;
  }

  .panel-actions {
    @apply -my-1 -mr-1;
  }

  .panel-back {
    @apply -my-2 -ml-1.5 mr-2;
  }

  .panel-body {
    @apply relative h-full;
  }

  .panel-scroller {
    @apply absolute inset-0
    scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-slate-400 scrollbar-track-transparent;
    overflow-y: overlay;
    overflow-y: auto; /* Fallback for browsers that support it */
    scrollbar-gutter: auto;
    mask: linear-gradient(to bottom,
    #0000,
    #ffff var(--top-fade) calc(100% - var(--bottom-fade)),
    #0000
    );
    animation: scrollfade;
    animation-timeline: --scrollfade;
    scroll-timeline: --scrollfade y;
  }

  .panel.xs > .panel-header,
  .panel.xs > .panel-footer {
    @apply px-2 py-2 text-sm;
  }

  .panel.sm > .panel-header,
  .panel.sm > .panel-footer {
    @apply px-3 py-3 text-sm;
  }

  .panel.lg .panel-header,
  .panel.lg .panel-footer {
    @apply px-5 py-5;
  }

  @property --top-fade {
    syntax: "<length>";
    inherits: false;
    initial-value: 0;
  }

  @property --bottom-fade {
    syntax: "<length>";
    inherits: false;
    initial-value: 0;
  }

  @keyframes scrollfade {
    0% {
      --top-fade: 0;
    }
    10%, 100% {
      --top-fade: 2rem;
    }
    0%, 90% {
      --bottom-fade: 2rem;
    }
    100% {
      --bottom-fade: 0;
    }
  }

</style>
