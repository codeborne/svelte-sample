<script>
  import NumberField from 'src/forms/NumberField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Number field">
  <div class="w-64 mx-auto common-grid">
    <NumberField label="Percentage" unit="%" value={33}/>
    <NumberField label="Width, step=0.1" unit="cm" value={545.3} step={0.1}/>
  </div>
</Sample>
