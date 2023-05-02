<script lang="ts">
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import Sensor from 'src/graphical/Sensor.svelte'
  import FormField from 'src/forms/FormField.svelte'

  let upperBound = 90
  let lowerBound = 15
  let value = 33
  let label = 'Sauna'
  let unit = '°C'
</script>

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
<Sensor {lowerBound} {upperBound} {value} {unit} {label}/>
