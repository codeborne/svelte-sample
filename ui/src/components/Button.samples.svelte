<script lang="ts">
  import Button from 'src/components/Button.svelte'

  const sizes = ['sm', '', 'lg']
</script>

<div class="common-grid sm:grid-cols-4">
  {#each sizes as size}
    <div class="flex flex-col gap-6">
      <h2>Size {size || 'default'}</h2>
      <Button label="Default" {size}/>
      <Button label="Primary" class="primary" {size}/>
      <Button label="Danger" class="danger" {size}/>
      <Button label="Success" class="success" {size}/>
    </div>
  {/each}
</div>
