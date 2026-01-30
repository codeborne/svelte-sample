<script lang="ts">
  import Menu from 'src/components/Menu.svelte'
  import MenuLink from 'src/components/MenuLink.svelte'
  import Panel from 'src/components/Panel.svelte'
  import Button from 'src/components/Button.svelte'
  import Dropdown from 'src/components/Dropdown.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['', 'sm', 'xs'] as const
</script>

<SampleSection title="Usage"
               description="Generic menu component that can be used in different contexts to render links with icons
                and an optional selected state">
</SampleSection>

<SampleSection title="Sizes">
  <div class="h-80 flex flex-col sm:flex-row gap-6">
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
</SampleSection>

<SampleSection title="Panels">
  <div class="grid sm:grid-cols-3 gap-6">
    {#each sizes as size}
      <Panel {size} title="Panel with a menu" class="!h-80">
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
</SampleSection>
