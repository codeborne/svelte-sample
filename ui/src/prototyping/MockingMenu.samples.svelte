<script>
  import MockingMenu from 'src/prototyping/MockingMenu.svelte'
  import Button from 'src/components/Button.svelte'
  import {Link} from 'svelte-navigator'

  let viewScope = 'future'
</script>

Check the menu at the edge of the page ↘️

<MockingMenu title="Scenarios">
  <div class="grid gap-2 text-xs">
    <Link to="/emails">View mock e-mails</Link>
    <a href={'#'}>Another mock action</a>
  </div>
</MockingMenu>

<MockingMenu position="bottom-right" icon="">
  <div class="flex gap-1">
    {#each [['mvp', 'MVP'], ['future', 'Future']] as [slug, title]}
      <Button size="xs" color={viewScope === slug ? 'primary' : '' }
              on:click={() => viewScope = slug}>
        {title}
      </Button>
    {/each}
  </div>
</MockingMenu>
