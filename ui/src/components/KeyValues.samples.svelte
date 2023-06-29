<script lang="ts">
  import KeyValue from 'src/components/KeyValue.svelte'
  import KeyValueList from 'src/components/KeyValueList.svelte'

  const sizes = ['', 'sm', 'xs'] as const

  const mockValuePairs: any = [
    {
      key: 'Model',
      value: 'DJI Mavic 3 pro',
      unit: null,
      icon: null
    },
    {
      key: 'Max range',
      value: '8.7',
      unit: 'km',
      icon: null
    },
    {
      key: 'Max flight time',
      value: '28',
      unit: 'minutes',
      icon: null
    },
    {
      key: 'Battery',
      value: '89',
      unit: '%',
      icon: 'alert-triangle'
    }
  ]
</script>

<h4>Default usage</h4>
<div class="common-grid mb-4">
  {#each mockValuePairs as {key, value, unit}}
    <KeyValue label={key} value={value + ' ' + (unit ? unit : '') }/>
  {/each}
</div>

<h4>Formatted content</h4>
<div class="common-grid mb-4">
  {#each mockValuePairs as {key, value, unit}}
    <KeyValue label={key}>
      {value}
      {#if unit}<small class="text-muted">{unit}</small>{/if}
    </KeyValue>
  {/each}
</div>

<h4>Side-by-side grid</h4>
<div class="grid grid-cols-4 mb-4">
  {#each mockValuePairs as {key, value, unit}}
    <KeyValue label={key}>
      {value}
      {#if unit}<small class="text-muted">{unit}</small>{/if}
    </KeyValue>
  {/each}
</div>

<h4>Converted to a list</h4>
<div class="grid grid-cols-3 mb-4 gap-6">
  {#each sizes as size}
    <KeyValueList {size}>
      {#each mockValuePairs as {key, value, unit}}
        <KeyValue label={key}>
          {value}
          {#if unit}<small class="text-muted">{unit}</small>{/if}
        </KeyValue>
      {/each}
    </KeyValueList>
  {/each}
</div>
