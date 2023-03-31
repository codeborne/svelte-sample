<script lang="ts">
  import FormField from './FormField.svelte'
  import {createEventDispatcher} from 'svelte'

  export let label: string | undefined = undefined
  export let value: number | undefined
  export let min = 0, max = Infinity
  export let units: [string, string]
  export let unitRatio: number
  export let step: number = 1
  export let required = true
  export let helpText = ''

  $: digits = -Math.log10(step)

  let unitValue = value
  let unitMin = min, unitMax = max
  export let unit = units[0]

  let oldValue: number | undefined
  $: if (oldValue != value) {
    unitValue = value
    if (unit == units[1]) updateUnitValue()
    oldValue = value
  }

  function updateUnitValue() {
    if (value === undefined) return unitValue = undefined
    const convert = unit == units[1]
    const ratio = convert ? unitRatio : 1 / unitRatio
    unitValue = Math.round((unitValue ?? 0) * ratio / step) * step
    unitMin = convert ? Math.round(unitMin * ratio) : min
    unitMax = convert ? Math.round(unitMax * ratio) : max
    return convert
  }

  function updateValue() {
    if (unitValue != 0 && !unitValue) return value = undefined
    oldValue = value = unit == units[0] ? unitValue : Math.round(unitValue / unitRatio / step) * step
  }

  const dispatch = createEventDispatcher<{change: number}>()
  function onUnitChanged() {
    if (updateUnitValue()) updateValue()
    dispatch('change', value)
  }
</script>

<FormField {label} {helpText} class={$$props.class} let:id>
  <div class="flex">
    <input {id} type="number" {...$$restProps} min={unitMin.toFixed(digits)} max={unitMax.toFixed(digits)} {step} {required}
           bind:value={unitValue} on:change={updateValue}
           class="!rounded-r-none !border-r-0">
    <select class="!rounded-l-none !w-auto !pl-1 !pr-7" bind:value={unit} on:change={onUnitChanged}>
      {#each units as unit}<option>{unit}</option>{/each}
    </select>
  </div>
</FormField>
