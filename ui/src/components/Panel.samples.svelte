<script lang="ts">
  import Panel from './Panel.svelte'
  import Section from './Section.svelte'
  import Button from './Button.svelte'
  import Menu from './Menu.svelte'
  import MenuLink from './MenuLink.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['', 'sm', 'xs'] as const
</script>

<SampleSection title="Usage">
  Panel is a container that fills the available space both horizontally and vertically. If there is longer content than
  it can fit, it automatically creates a scrolling body.
</SampleSection>

<SampleSection title="Sizes">
  {#each sizes as size}
    <div class="text-lg font-semibold">{size || "Default"}</div>

    <div class="mb-20 grid h-[600px] gap-8 sm:grid-cols-3">
      <!-- Panel without Title -->
      <Panel {size}>
        {#snippet children()}
          <Section {size}>Basic panel without a title</Section>
        {/snippet}
      </Panel>

      <!-- Panel with Footer Snippet -->
      <Panel {size} title="Panel title">
        {#snippet children()}
          <Section title="Section title" {size}>Basic section with a title</Section>
          <Section title="Section title" {size}>Basic section with a title</Section>

        {/snippet}

        {#snippet footer()}
          Panel footer
        {/snippet}
      </Panel>

      <!-- Panel with Actions and Footer Snippet -->
      <Panel {size} title="Panel title">
        {#snippet actions()}
          <Button icon="x" title="Close" variant="ghost" class="circular" {size}/>
        {/snippet}

        {#snippet children()}
          <Section {size}>
            {#each {length: 10} as _}
              <p class="mb-1">Panel contents that can extend beyond the panel height.</p>
            {/each}
          </Section>
        {/snippet}

        {#snippet footer()}
          <Button {size}>Cancel</Button>
          <Button {size} color="primary">Save</Button>
        {/snippet}
      </Panel>

      <!-- Panels with Menus -->
      <Panel {size} title="Panel with a menu">
        {#snippet children()}
          <Menu>
            <MenuLink {size}>Some link</MenuLink>
            <MenuLink {size}>Another link</MenuLink>
            <MenuLink {size}>And a third one</MenuLink>
          </Menu>
        {/snippet}
      </Panel>

      <Panel {size} title="Panel with a menu">
        {#snippet children()}
          <Menu>
            <MenuLink {size} icon="chevron-right">First menu item</MenuLink>
            <MenuLink {size} icon="chevron-right">Second menu item</MenuLink>
            <MenuLink {size} icon="chevron-right">And a third one that maybe gets to multiple lines</MenuLink>
          </Menu>
        {/snippet}
      </Panel>
    </div>
  {/each}
</SampleSection>

<SampleSection title="With back button">
  <div class="h-64 w-96">
    <Panel onBack={() => history.back()} title="Panel title with a back button">
      {#snippet children()}
        <Section>Panel of a sub page which has also possibility to navigate back</Section>
      {/snippet}
    </Panel>
  </div>
</SampleSection>
