<script>
  import Icon from 'src/icons/Icon.svelte'
  import Tooltip from 'src/components/Tooltip.svelte'

  const tooltipText = 'This is some helpful information about the history section.'
</script>

<div>
  <h2 class="h3">Tooltip</h2>
  <div class="flex flex-col sm:flex-row gap-4 justify-between">
      <Tooltip text={'Tooltip 1: ' + tooltipText}>
        Ordinary tooltip
      </Tooltip>

    <div class="text-warning-700">
      <Tooltip text={'Tooltip 2: ' + tooltipText}>
        Tooltip with custom icon
        <svelte:fragment slot="trigger">
          <Icon name="alert-triangle" size="sm"
                class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
        </svelte:fragment>
      </Tooltip>
    </div>

    <Tooltip text={'Tooltip 3: ' + tooltipText}>
      <svelte:fragment slot="trigger">
        Text is also a trigger
        <Icon name="alert-triangle" size="sm"
              class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
      </svelte:fragment>
    </Tooltip>
  </div>
</div>
