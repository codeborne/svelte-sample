<script lang="ts">
  import type {Snippet} from 'svelte'
  import {slide} from 'svelte/transition'
  import Button from 'src/components/Button.svelte'
  import Icon from 'src/icons/Icon.svelte'

  let {
    title,
    animationsEnabled = true,
    collapsible = false,
    collapse = false,
    onclick,
    children,
    ...props
  }: {
    title?: string
    animationsEnabled?: boolean
    collapsible?: boolean
    collapse?: boolean
    class?: string
    onclick?: () => void
    children?: Snippet;
  } = $props()

  const toggleCollapse = (e: MouseEvent) => {
    e.stopPropagation()
    collapse = !collapse
  }
</script>

<div class="card bg-white shadow-sm card {props.class}"
     class:collapsible={collapsible}
     class:collapsed={collapse}
>
  {#if title}
    <div class="card-header"
         on:click={collapsible ? toggleCollapse : null}
    >
      <div>
        <h3 class="card-title">{title}</h3>
      </div>
      {#if collapsible}
        <div>
          <Button class="circular"
                  variant="ghost"
                  onclick={toggleCollapse}
          >
            <Icon name={collapse ? 'chevron-down' : 'chevron-up'}/>
          </Button>
        </div>
      {/if}
    </div>
  {/if}

  {#if collapsible}
    {#if animationsEnabled}
      {#if !collapse}
        <div transition:slide|local class="card-body">
          {#if children}
            {@render children()}
          {/if}
        </div>
      {/if}
    {:else}
      {#if !collapse}
        <div class="card-body">
          {#if children}
            {@render children()}
          {/if}
        </div>
      {/if}
    {/if}
  {:else}
    <div class="card-body">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss" global>
  @reference "../../global.css";

  .card-header {
    @apply flex justify-between items-center;
  }

  .card > .card-header .card-title {
    @apply text-lg font-medium leading-6;
  }

  .card > .card-header {
    @apply px-4 py-3;
  }

  .card > .card-body {
    @apply px-4 py-5;
  }
</style>
