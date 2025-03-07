<script lang="ts">
  import CheckboxField from './CheckboxField.svelte'
</script>

<p>Choosing between default vs toggle – checkbox expects a save button, switch does not.</p>

<h4>Default</h4>

<div class="mb-4 grid w-64 gap-3">
  {#each ["First check", "Second check", "Third check"] as item, index}
    <CheckboxField label={item} checked={index === 0} disabled={index === 2}/>
  {/each}
</div>

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

<h4>Standalone toggle</h4>
<div class="text-sm">To be used with accompanied text</div>
<div class="mb-4 grid w-64 gap-3">
  <CheckboxField renderAsToggle/>
  <CheckboxField checked={true} renderAsToggle/>
</div>
