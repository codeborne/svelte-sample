<script lang="ts">
  import ButtonGroup from './ButtonGroup.svelte'
  import Button from './Button.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['xs', 'sm', '', 'lg'] as const

  let selectedOption = 0
</script>

<SampleSection
  title="Usage"
  description="Use for compact button-style alternatives to radio buttons. Good for quick switches like tabs or filters.">
</SampleSection>

<SampleSection title="Sizes">
  <div class="grid justify-items-start gap-3">
    {#each sizes as size}
      <ButtonGroup>
        {#each Array(3) as item, i}
          <Button
            color="primary"
            variant={selectedOption === i ? "solid" : "outlined"}
            {size}
            onclick={() => (selectedOption = i)}
          >
            Primary {size.toUpperCase()}
          </Button>
        {/each}
      </ButtonGroup>
    {/each}
  </div>
</SampleSection>

<SampleSection title="With icon buttons">
  <div class="grid justify-items-start gap-3">
    <ButtonGroup>
      {#each Array(3) as item, i}
        <Button
          color="primary"
          class="flex-col"
          icon="info-circle"
          variant={selectedOption === i ? "solid" : "outlined"}
          size="xs"
          onclick={() => (selectedOption = i)}
        >
          Columned icon
        </Button>
      {/each}
    </ButtonGroup>

    <ButtonGroup>
      {#each Array(3) as item, i}
        <Button
          color="primary"
          class="flex-col"
          icon="info-circle"
          variant={selectedOption === i ? "solid" : "outlined"}
          size="sm"
          onclick={() => (selectedOption = i)}
        >
          Columned icon
        </Button>
      {/each}
    </ButtonGroup>
  </div>
</SampleSection>
