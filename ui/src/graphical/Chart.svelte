<script lang="ts">
  import G from 'src/graphical/G.svelte'

  export let chartWidth = 0
  export let chartHeight = 0
  export let width = 1000
  export let height = 500
  export let offset = 25

  let heightTop = 0
  let heightBottom = 0
  let widthLeft = 0
  let widthRight = 0

  $: chartWidth = width - widthLeft - widthRight - offset - offset
  $: chartHeight = height - heightTop - heightBottom - offset - offset
</script>
<svg {...$$restProps} viewBox="0,0,{width},{height}">
  <defs>
    <clipPath id="chartClip">
      <rect height="{chartHeight}" width="{chartWidth}" x="0" y="0"></rect>
    </clipPath>
  </defs>
  <G bind:height={heightTop} transform="translate({widthLeft + offset}, 0)">
    <slot name="top"></slot>
  </G>
  <G bind:height={heightBottom} transform="translate({widthLeft + offset},{height-heightBottom})">
    <slot name="bottom"></slot>
  </G>
  <g transform="scale(1,-1) translate(0,{-chartHeight-heightTop-offset})" >
    <G bind:width={widthLeft}>
      <slot name="left"></slot>
    </G>
    <G bind:width={widthRight} transform="translate({width-widthRight},0)">
      <slot name="right"></slot>
    </G>
    <g transform="translate({widthLeft + offset},0)" clip-path="url(#chartClip)">
      <slot {chartHeight} {chartWidth} name="chart"></slot>
      <rect fill="transparent" height={chartHeight} stroke="black" width={chartWidth} x="0" y="0"/>
    </g>
  </g>
</svg>
