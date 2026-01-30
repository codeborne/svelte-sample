<script lang="ts">
  import Dropdown from 'src/components/Dropdown.svelte'
  import Button from 'src/components/Button.svelte'
  import Menu from 'src/components/Menu.svelte'
  import MenuLink from 'src/components/MenuLink.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['', 'sm', 'xs'] as const
</script>

<SampleSection title="Dropdown">
  <div class="flex justify-between">
    <Dropdown>
      <Button>
        Sample dropdown
      </Button>
      {#snippet menu()}
        <div class="w-80 px-3 py-2">
          Dropdown content
        </div>
      {/snippet}
    </Dropdown>
    <Dropdown class="right-0">
      <Button>
        Right-aligned dropdown
      </Button>
      {#snippet menu()}
        <div class="w-80 px-3 py-2">
          Dropdown content
        </div>
      {/snippet}
    </Dropdown>
  </div>
</SampleSection>

<SampleSection title="With menus">
  <div class="h-96 flex gap-6">
    {#each sizes as size}
      <Dropdown>
        <Button {size}>
          Menu {size} dropdown
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
