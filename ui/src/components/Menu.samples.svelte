<script lang="ts">
  import Menu from 'src/components/Menu.svelte'
  import MenuLink from 'src/components/MenuLink.svelte'
  import Panel from 'src/components/Panel.svelte'
  import Button from 'src/components/Button.svelte'
  import Dropdown from 'src/components/Dropdown.svelte'

  const sizes = ['', 'sm', 'xs'] as const
</script>

<p>Generic menu component that can be used in different contexts to render links with icons and an optional selected
  state</p>

<div class="h-96 flex gap-6">
  {#each sizes as size}
    <Dropdown>
      <Button {size}>
        Sample {size} dropdown
      </Button>
      {#snippet menu()}
        <Menu class="w-64">
          <MenuLink {size} icon="chevron-right">First menu item</MenuLink>
          <MenuLink {size} icon="chevron-right">Second menu item</MenuLink>
          <MenuLink {size} icon="chevron-right">And a third one that maybe gets to multiple lines</MenuLink>
        </Menu>
      {/snippet}
    </Dropdown>
  {/each}
</div>


<div class="h-96 grid grid-cols-3 gap-6">
  {#each sizes as size}
    <Panel {size} title="Panel with a menu">
      {#snippet children()}
        <Menu>
          <MenuLink {size} icon="chevron-right">First menu item</MenuLink>
          <MenuLink {size} icon="chevron-right">Second menu item</MenuLink>
          <MenuLink {size} icon="chevron-right">And a third one that maybe gets to multiple lines</MenuLink>
        </Menu>
      {/snippet}
    </Panel>
  {/each}
</div>
