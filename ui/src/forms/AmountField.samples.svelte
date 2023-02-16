<script>
  import AmountField from 'src/forms/AmountField.svelte'
</script>

<div class="w-64 common-grid">
  <AmountField label="Price" value={123.47}/>
  <AmountField label="Price" value={1250} currency="PLN"/>
</div>
