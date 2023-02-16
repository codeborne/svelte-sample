<script>
  import UnitsField from 'src/forms/UnitsField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Units field">
  <div class="w-64 mx-auto common-grid">
    <UnitsField label="Price" value={100} units={['€ excl. VAT', '€ incl. VAT']} unitRatio={1.2}/>
    <UnitsField label="Residual amount" value={1500.45} units={['€', '%']} unitRatio={0.03} unit="%"/>
  </div>
</Sample>
