<script>
  import Icon from 'src/icons/Icon.svelte'
  import Tooltip from 'src/components/Tooltip.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const tooltipText = 'This is some helpful information about the section.'
</script>

<SampleSection title="Examples">
  <div class="flex flex-col sm:flex-row gap-4 justify-between">
    <Tooltip text={'Tooltip 1: ' + tooltipText}>
      Ordinary tooltip
    </Tooltip>

    <div class="text-warning-700">
      <Tooltip text={'Tooltip 2: ' + tooltipText}>
        Tooltip with custom icon
        {#snippet trigger()}
          <Icon name="alert-triangle" size="sm"
                class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
        {/snippet}
      </Tooltip>
    </div>

    <Tooltip text={'Tooltip 3: ' + tooltipText}>
      {#snippet trigger()}
        Text is also a trigger
        <Icon name="alert-triangle" size="sm"
              class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
      {/snippet}
    </Tooltip>
  </div>
</SampleSection>
