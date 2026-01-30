<script lang="ts">
  import CheckboxField from './CheckboxField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Usage"
               description="Choosing between default vs toggle – checkbox expects a save button, switch does not.">
</SampleSection>

<SampleSection title="Default">
  <div class="mb-4 grid w-64 gap-3">
    {#each ["First check", "Second check", "Third check"] as item, index}
      <CheckboxField label={item} checked={index === 0} disabled={index === 2}/>
    {/each}
  </div>
</SampleSection>

<SampleSection title="Toggle switches">
  <div class="mb-4 grid w-64 gap-3">
    {#each ["First switch", "Second switch", "Disabled switch"] as item, index}
      <CheckboxField
        label={item}
        checked={index === 0}
        disabled={index === 2}
        renderAsToggle
      />
    {/each}
  </div>
</SampleSection>

<SampleSection title="Standalone toggle">
  <div class="text-sm">To be used with accompanied text</div>
  <div class="mb-4 grid w-64 gap-3">
    <CheckboxField renderAsToggle/>
    <CheckboxField checked={true} renderAsToggle/>
  </div>
</SampleSection>
