<script lang="ts">
  import type {Snippet} from 'svelte'
  import Button from 'src/components/Button.svelte'

  interface Props {
    title: string;
    description?: Snippet | string;
    children?: Snippet;
    sectionClass?: string;
  }

  let toggledContainerColor = $state(false);

  const { title, description, sectionClass, children}: Props = $props();

  const sectionId = title.toLowerCase().replace(/\s+/g, '-');
</script>

<div class="group scroll-my-13 pb-4 sm:pb-12 px-4 sm:px-6 -mx-3 sm:-mx-6 border-t {toggledContainerColor ? 'bg-neutral-50 dark:bg-neutral-900': ''} {sectionClass}" id={sectionId}>
  <div class="pt-4 sm:pt-12">
    <div class="flex justify-between">
      <a href="{title}" class="sample-section-title font-semibold uppercase text-neutral-500 dark:text-neutral-200">{title}</a>

      <Button size="sm" color="primary" variant="outlined"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
              onclick={() => (toggledContainerColor = !toggledContainerColor)}
      >Toggle container color
      </Button>
    </div>

    {#if description}
      <div class="pt-4 space-y-4">
        {#if typeof description === "function"}
          {@render description()}
        {:else}
          {description}
        {/if}
      </div>
    {/if}
  </div>
  {#if children}
    <div class="pt-2 sm:pt-6 space-y-4">
      {@render children()}
    </div>
  {/if}
</div>
