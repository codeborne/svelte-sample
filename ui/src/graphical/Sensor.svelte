<script lang="ts">
  import DonutArc from 'src/graphical/DonutArc.svelte'

  export let value: number = 33
  export let upperBound: number = 90
  export let lowerBound: number = 15
  export let label = ''
  export let unit = '%'


  $:upperBoundLength = pctToAngle(100 - upperBound)
  $:lowerBoundAngle = pctToAngle(lowerBound)

  $: color = value > lowerBound ? 'green' : 'red'
  $: lowerColor = value > lowerBound ? 'green' : 'yellow'
  $: valueOffset = value > lowerBound ? lowerBound : 0


  $: upper = {angle: pctToAngle(100 - upperBound), color: 'lightgray', offset: pctToAngle(upperBound)}
  $: lower = {angle: pctToAngle(lowerBound), color: lowerColor, offset: 0}
  $: working = {angle: pctToAngle(upperBound - lowerBound), color: 'yellow', offset: pctToAngle(lowerBound)}
  $: valuePart = {angle: pctToAngle(value), color: color, offset: pctToAngle(0)}

  function pctToAngle(pct: number) {
    return pct * 3.6
  }

  let radius = 50
  let width = radius * 0.2
</script>
<svg viewBox="0 0 {radius*2} {radius*2}">
  <g transform="translate({radius},{radius}) scale(1.0,-1.0)">
    <mask id="myMask">
      {#if upper.angle}
        <DonutArc angle={upper.angle-1} color="white" offset={upper.offset+1} {radius} {width}/>
      {/if}
      {#if lower.angle}
        <DonutArc angle={lower.angle-1} color="white" offset={lower.offset+1} {radius} {width}/>
      {/if}
      {#if working.angle}
        <DonutArc angle={working.angle-1} color="white" offset={working.offset+1} {radius} {width}/>
      {/if}
    </mask>
    <g mask="url(#myMask)">
      <DonutArc angle={360} color={upper.color} {radius} {width}/>
      <DonutArc angle={lower.angle} color={lower.color} {radius} {width}/>
      <DonutArc angle={upper.offset} color={working.color} {radius} {width}/>
      <DonutArc angle={valuePart.angle} color={valuePart.color} {radius} {width}/>
    </g>
    <text class="font-bold font-mono" transform="scale(1.5,-1.5)">{value}{unit}</text>
    <text class="label text-muted" transform="scale(0.50,-0.50)" y="30">{label}</text>
  </g>
</svg>
<style>
  svg text {
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .label {
    @apply fill-gray-400 stroke-gray-400
  }
</style>
