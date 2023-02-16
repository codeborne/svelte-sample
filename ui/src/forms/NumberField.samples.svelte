<script>
  import NumberField from 'src/forms/NumberField.svelte'
  import Sample from 'src/samples/Sample.svelte'
  let val = 33

</script>

<Sample title="Number field">
  <div class="common-grid w-64 mx-auto">
    <NumberField label="Percentage" unit="%" bind:value={val}/>
    <NumberField label="Currency" unit="EUR" bind:value={val}/>
  </div>
</Sample>
