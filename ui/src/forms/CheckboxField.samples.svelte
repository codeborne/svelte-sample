<script lang="ts">
  import CheckboxField from './CheckboxField.svelte'
  import type {ComponentProps} from 'svelte'
</script>

<h4>Default</h4>

<div class="mb-4 grid w-64 gap-3">
  {#each ["First check", "Second check", "Third check"] as item, index}
    <CheckboxField label={item} checked={index === 0} disabled={index === 2}/>
  {/each}
</div>

<h4>Render as toggle</h4>

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
