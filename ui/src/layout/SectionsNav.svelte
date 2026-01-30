<script lang="ts">
  import {onMount} from 'svelte'

  type Section = {
    id: string;
    title: string;
  };

  let sections = $state<Section[]>([]);

  onMount(() => {
    const sectionElements = document.querySelectorAll('.sample-section-title');
    sections = Array.from(sectionElements).map(el => ({
      id: el.closest('[id]')?.id || '',
      title: el.textContent || ''
    })).filter(section => section.id);
  });
</script>

{#if sections.length > 0}
  <div class="sticky top-0 z-10 border-b -mb-px flex gap-4 py-4 flex-wrap bg-white dark:bg-neutral-800">
    {#each sections as section}
      <a href="#{section.id}" class="text-sm font-medium hover:underline">
        {section.title}
      </a>
    {/each}
  </div>
{/if}
