<script>
  import NumberField from 'src/forms/NumberField.svelte'
</script>

<div class="w-64 common-grid">
  <p>Min value is 0 by default</p>
  <NumberField label="Percentage" unit="%" value={33}/>
  <NumberField label="Width, step=0.1" unit="cm" value={545.3} step={0.1}/>
  <NumberField label="No unit" value={1} min={-1} step="any"/>
</div>
