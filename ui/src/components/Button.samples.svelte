<script lang="ts">
  import Button from 'src/components/Button.svelte'

  const sizes = ['xs', 'sm', '', 'lg'] as const
  const colors = ['primary','secondary','danger','warning','success'] as const
  const variants = ['solid','soft','outlined','ghost'] as const
</script>

<div class="common-grid sm:grid-cols-4">
  {#each sizes as size}
    <div class="flex flex-col gap-6">
      <h4>Size {size || 'default'}</h4>
      {#each colors as color}
        <div class="grid gap-2">
        {#each variants as variant}
          <Button label={color + ' ' + variant} {color} {size} {variant}/>
        {/each}
        </div>
      {/each}
      <Button label="With icon" {size} icon="link-external"/>
      <div><Button {size} icon="copy" title="Icon only"/></div>
    </div>
  {/each}
</div>
