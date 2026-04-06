<script lang="ts">
  import SampleSection from 'src/layout/SampleSection.svelte'

  const shadows = ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl']
</script>

<SampleSection title="Shadows">
  <div class="flex gap-x-12">
    {#each shadows as shadow}
      <div class="{shadow} flex items-center justify-center rounded aspect-square p-3">
        <span class="text-sm text-nowrap">{shadow}</span>
      </div>
    {/each}
  </div>
</SampleSection>

<SampleSection title="Glow">
  <div class="flex gap-x-12">
    <div class="flex items-center justify-center rounded aspect-square max-w-48 p-3 shadow-lg shadow-primary/20">
      <span class="text-sm text-nowrap">Primary glow</span>
    </div>
  </div>
</SampleSection>
