<script>
  import AmountField from 'src/forms/AmountField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Amount field">
  <div class="w-64 mx-auto common-grid">
    <AmountField label="Price" value={123.47}/>
    <AmountField label="Price" value={1250} currency="PLN"/>
  </div>
</Sample>
