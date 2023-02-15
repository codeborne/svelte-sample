<script lang="ts">
  import Button from 'src/components/Button.svelte'

  const def = {label: 'Default'}
  const props = [
    def,
    {...def, size: 'lg'},
    {...def, size: 'sm'}
  ]
</script>

<div class="common-grid sm:grid-cols-4">
  <div class="flex flex-col gap-6">
    {#each props as p}
      <Button {...p}/>
    {/each}
  </div>

  <div class="flex flex-col gap-6">
    <Button label="Primary" class="primary"/>
    <Button label="Primary lg" class="primary" size="lg"/>
    <Button label="Primary sm" class="primary" size="sm"/>
  </div>
  <div class="flex flex-col gap-6">
    <Button label="Danger" class="danger"/>
    <Button label="Danger lg" class="danger" size="lg"/>
    <Button label="Danger sm" class="danger" size="sm"/>
  </div>
  <div class="flex flex-col gap-6">
    <Button label="Success" class="success"/>
    <Button label="Success lg" class="success" size="lg"/>
    <Button label="Success sm" class="success" size="sm"/>
  </div>
</div>
