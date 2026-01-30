<script>
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import NumberField from 'src/forms/NumberField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  let range = 33
</script>

<SampleSection title="Examples">
  <div class="w-64 common-grid">
    <RangeSlider label="RangeSlider" min={10} max={40} bind:value={range}/>
    <NumberField bind:value={range}/>
  </div>
</SampleSection>
