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

</script>
<RangeSlider label="Window width" min={1} max={720} bind:value={windowWidth}/>
<RangeSlider label="Window Height" min={1} max={20} bind:value={windowHeight}/>
<Chart class="p-2 border-2 border-amber-500 rounded-xl" offset={5}
       {windowWidth} {windowHeight}
       xMax={360} xMin={0}
>
  <g slot="top">
    <XLabels data={xTics}/>
  </g>
  <g slot="bottom">
    <XLabels data={xTics}/>
  </g>
  <g slot="left">
    <YLabels data={yTics} textAnchor="end"/>
  </g>
  <g slot="right">
    <YLabels data={yTics}/>
  </g>
  <g slot="chart" let:matrix let:chartHeight let:chartWidth >
    <Grid {chartHeight} {chartWidth} dataX={xTics} dataY={yTics}/>
    <rect fill="transparent" height={chartHeight} stroke="black" width={chartWidth}></rect>
    <Polyline class="stroke-red-500" data={sin} stroke-width="2"/>
    <Polyline class="stroke-amber-500" data={cos}/>
    <Polyline class="stroke-green-500" data={mix}/>
  </g>
</Chart>
