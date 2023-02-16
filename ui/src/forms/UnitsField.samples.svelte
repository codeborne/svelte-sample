<script>
  import UnitsField from 'src/forms/UnitsField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Units field">
  <div class="w-64 mx-auto">
    <UnitsField label="UnitsField" value={100} units={['€ excl. VAT', '€ incl. VAT']} unitRatio={1.2}/>
  </div>
</Sample>
