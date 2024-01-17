<script>
  import MockingMenu from 'src/prototyping/MockingMenu.svelte'
  import Button from 'src/components/Button.svelte'

  let viewScope = 'future'
</script>

Check the menu at the edge of the page ↘️

<MockingMenu title="Scenarios">
  <div class="grid gap-2 text-xs">
    <a href={'#'}>Some mock action</a>
    <a href={'#'}>Another mock action</a>
  </div>
</MockingMenu>

<MockingMenu position="bottom-right" icon="">
  <div class="flex gap-1">
    {#each [['mvp', 'MVP'], ['future', 'Future']] as [slug, title]}
      <Button class="xs {viewScope === slug ? 'primary' : '' }"
              on:click={() => viewScope = slug}>
        {title}
      </Button>
    {/each}
  </div>
</MockingMenu>
