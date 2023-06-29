<script lang="ts">
  import DonutArc from 'src/graphical/DonutArc.svelte'
  import type {Graphics} from 'src/graphical/graphics'

  export let radius = 50
  export let width = 15.0
  export let items: Graphics[] = []


</script>
<svg viewBox="0 0 {radius*2} {radius*2}">
  <g transform="translate({radius},{radius}) scale(1.0,-1.0)">
    {#each items as item}
      <DonutArc angle={item.angle} color={item.color} offset={item.offset} {radius} {width}/>
    {/each}
    <slot {radius} {width}/>
  </g>
</svg>
