<script lang="ts">
  import Button from 'src/components/Button.svelte'

  const sizes = ['xs', 'sm', '', 'lg'] as const
</script>

<div class="common-grid sm:grid-cols-4">
  {#each sizes as size}
    <div class="flex flex-col gap-6">
      <h4>Size {size || 'default'}</h4>
      <Button label="Default" {size}/>
      <Button label="Primary" class="primary" {size}/>
      <Button label="Danger" class="danger" {size}/>
      <Button label="Success" class="success" {size}/>
      <Button label="Link" class="link" {size}/>
      <Button label="With icon" {size} icon="link-external"/>
      <div><Button {size} icon="copy" title="Icon only"/></div>
    </div>
  {/each}
</div>
