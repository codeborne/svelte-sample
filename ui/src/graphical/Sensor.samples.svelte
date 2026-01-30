<script lang="ts">
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import Sensor from 'src/graphical/Sensor.svelte'
  import FormField from 'src/forms/FormField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  let upperBound = 90
  let lowerBound = 15
  let value = 33
  let label = 'Sauna'
  let unit = '°C'
</script>

<SampleSection title="Examples">
  <div class="max-w-64 space-y-8">
    <div class="space-y-4">
      <FormField label="Upper Bound">
        <RangeSlider bind:value={upperBound} max={100} min={0}/>
      </FormField>
      <FormField label="Lower Bound">
        <RangeSlider bind:value={lowerBound} max={100} min={0}/>
      </FormField>
      <FormField label="Value">
        <RangeSlider bind:value={value} max={100} min={0}/>
      </FormField>
      <div class="grid grid-cols-2">
        <FormField bind:value={label} label="Label"/>
        <FormField bind:value={unit} label="Unit"/>
      </div>
    </div>
    <Sensor {lowerBound} {upperBound} {value} {unit} {label}/>
  </div>
</SampleSection>
