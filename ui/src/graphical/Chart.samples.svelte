<script>
  import Chart from 'src/graphical/Chart.svelte'
  import Polyline from 'src/graphical/Polyline.svelte'
  import YLabels from 'src/graphical/YLabels.svelte'
  import XLabels from 'src/graphical/XLabels.svelte'
  import Grid from 'src/graphical/Grid.svelte'
  import RangeSlider from 'src/forms/RangeSlider.svelte'

  let sin = [...Array(360).keys()].map(i => new DOMPoint(i, 5 * Math.sin(i / 180 * Math.PI)))
  let cos = [...Array(360).keys()].map(i => new DOMPoint(i, 3 * Math.cos(i * 2 / 180 * Math.PI)))
  let mix = [...Array(360).keys()].map(i => new DOMPoint(i, 2 * Math.sin(i * 5 / 180 * Math.PI) + 3 * Math.cos(i * 2 / 180 * Math.PI)))
  let xTics = [...Array(361).keys()].filter(i => i % 15 === 0).map(i => new DOMPoint(i, 0))
  let yTics = [...Array(11).keys()].filter(i => i % 1 === 0).map(i => new DOMPoint(0, i - 5))
  let windowWidth = 180
  let windowHeight = 11
  let chartWidth = 0
  let chartHeight = 0
  $: matrix = new DOMMatrix().scale(chartWidth / windowWidth, chartHeight / windowHeight).translate(-90, 5.5)
</script>
<RangeSlider label="Window width" min={1} max={720} bind:value={windowWidth}/>
<RangeSlider label="Window Height" min={1} max={20} bind:value={windowHeight}/>
<Chart bind:chartHeight bind:chartWidth class="p-2 border-2 border-amber-500 rounded-xl" offset={5}>
  <g slot="top">
    <XLabels data={xTics} {matrix}/>
  </g>
  <g slot="bottom">
    <XLabels data={xTics} {matrix}/>
  </g>
  <g slot="left">
    <YLabels data={yTics} {matrix} textAnchor="end"/>
  </g>
  <g slot="right">
    <YLabels data={yTics} {matrix}/>
  </g>
  <g slot="chart">
    <Grid {chartHeight} {chartWidth} dataX={xTics} dataY={yTics} {matrix}/>
    <Polyline class="stroke-red-500" data={sin} {matrix} stroke-width="2"/>
    <Polyline class="stroke-amber-500" data={cos} {matrix}/>
    <Polyline class="stroke-green-500" data={mix} {matrix}/>
  </g>
</Chart>
