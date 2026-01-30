<script lang="ts">
  import Donut from 'src/graphical/Donut.svelte'
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
  import FormField from 'src/forms/FormField.svelte'

  let angle = 45
  let offset = 0
  $: items = [
    {angle: 360, color: 'yellow', offset: 0},
    {angle: angle, color: 'red', offset: offset},
    {angle: angle, color: 'green', offset: offset + angle}
  ]
</script>

<SampleSection title="Examples">
  <div class="max-w-64 space-y-8">
    <div class="space-y-4">
      <FormField label="Offset">
        <RangeSlider bind:value={offset} max={360} min={0}/>
      </FormField>
      <FormField label="Value">
        <RangeSlider bind:value={angle} max={180} min={0}/>
      </FormField>
    </div>
    <Donut {items}/>
  </div>
</SampleSection>
