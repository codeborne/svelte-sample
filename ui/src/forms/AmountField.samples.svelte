<script>
  import AmountField from 'src/forms/AmountField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Amount field">
  <div class="w-64 mx-auto">
    <AmountField label="Cost" value={123}/>
  </div>
</Sample>
