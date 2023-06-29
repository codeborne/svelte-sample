<script lang="ts">
  import Donut from 'src/graphical/Donut.svelte'
  import RangeSlider from 'src/forms/RangeSlider.svelte'

  let angle = 45
  let offset = 0
  $: items = [
    {angle: 360, color: 'yellow', offset: 0},
    {angle: angle, color: 'red', offset: offset},
    {angle: angle, color: 'green', offset: offset + angle}
  ]
</script>
<RangeSlider bind:value={offset} max={360} min={0}/>
<RangeSlider bind:value={angle} max={180} min={0}/>
<Donut {items}/>
