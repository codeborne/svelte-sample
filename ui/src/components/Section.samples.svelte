<script lang="ts">
  import Button from './Button.svelte'
  import Section from './Section.svelte'
  import SubSection from './SubSection.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['lg', '', 'sm', 'xs'] as const

  let isSidebarOpen = false

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen
  }
</script>

<SampleSection title="Usage">
  Section is a container that can be expanded/collapsed. Mainly intended to be used within Panel component.
</SampleSection>

<SampleSection title="Sizes">
  <div class="space-y-10">
    <div class="grid grid-cols-2 gap-2">
      {#each sizes as size}
        <div>
          <h4 class="mb-6">size: {size || "(default)"}</h4>
          <Section title="Section title" {size}>Basic section with a title</Section>
        </div>
      {/each}
    </div>

    <div>
      <h4 class="mb-6">Section with a custom action in the title</h4>
      <Section title="Section title">
        {#snippet actions()}
          <Button
            size="xs"
            variant="ghost"
            class="circular"
            icon="more-vert"
            onclick={(e) => {
            e.stopPropagation();
            alert("some action");
          }}
          />
        {/snippet}
        Basic section with a title
      </Section>
    </div>
  </div>
</SampleSection>

<SampleSection title="Section with SubSections">
  <Section title="Section title">
    <SubSection title="Subsection 1">content</SubSection>
    <SubSection title="Subsection 2">content</SubSection>
    <SubSection title="Subsection 3">content</SubSection>
  </Section>
</SampleSection>
