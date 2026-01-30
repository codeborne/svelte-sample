<script>
  import AmountField from 'src/forms/AmountField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Usage"
               description="Display monetary values with proper formatting.">
  <div class="w-64 common-grid">
    <AmountField label="Price" value={123.47}/>
    <AmountField label="Price" value={1250} currency="PLN"/>
  </div>
</SampleSection>
