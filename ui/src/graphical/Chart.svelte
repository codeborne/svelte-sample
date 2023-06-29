<script lang="ts">
  import G from 'src/graphical/G.svelte'
  import {setContext} from 'svelte'
  import {writable} from 'svelte/store'

  export let width = 1000
  export let height = 500
  export let offset = 25
  export let windowWidth = width
  export let windowHeight = height
  export let xMax = windowWidth
  export let xMin = 0
  export let chartWidth = width
  export let chartHeight = height

  let heightTop = 0
  let heightBottom = 0
  let widthLeft = 0
  let widthRight = 0
  let initialX = 0
  let offsetX = 0
  let deltaX = 0
  let isDragging = false

  $: chartWidth = width - widthLeft - widthRight - offset - offset
  $: chartHeight = height - heightTop - heightBottom - offset - offset
  let matrix = writable(new DOMMatrix())
  setContext('matrix',  matrix)
  $: $matrix = new DOMMatrix().scale(chartWidth / windowWidth, chartHeight / windowHeight).translate(offsetX, windowHeight / 2)
  let screenToRealMatrix: DOMMatrix

  function startDrag(event: MouseEvent | TouchEvent) {
    screenToRealMatrix = $matrix.multiply(DOMMatrix.fromMatrix((event.target as SVGGraphicsElement).getScreenCTM() as DOMMatrix)).inverse()
    initialX = screenToRealMatrix.transformPoint(screenPoint(event)).x
    isDragging = true
    return false
  }

  function endDrag(event: MouseEvent | TouchEvent) {
    isDragging = false
  }

  function mousemove(event: MouseEvent | TouchEvent) {
    if (isDragging) {
      const currentX = screenToRealMatrix.transformPoint(screenPoint(event)).x
      deltaX = currentX - initialX
      let offset = offsetX + deltaX
      if (xMin - offset > 0 && (xMax-windowWidth+offset) > 0) {
        offsetX = offset
      }
      initialX = currentX
    }
  }

  function screenPoint(event: MouseEvent | TouchEvent): DOMPoint {
    if (event instanceof MouseEvent) {
      return new DOMPoint(event.clientX, event.clientY)
    } else if (event instanceof TouchEvent) {
      return new DOMPoint(event.touches[0].clientX, event.touches[0].clientY)
    } else {
      return new DOMPoint(0, 0)
    }
  }
</script>
<svg {...$$restProps}
     on:mousedown|preventDefault={startDrag}
     on:mouseleave|preventDefault={endDrag}
     on:mousemove|preventDefault={mousemove}
     on:mouseup|preventDefault={endDrag}
     on:touchcancel|preventDefault={endDrag}
     on:touchend|preventDefault={endDrag}
     on:touchmove|preventDefault={mousemove}
     on:touchstart|preventDefault={startDrag}
     viewBox="0,0,{width},{height}">
  <defs>
    <clipPath id="chartClip">
      <rect height="{chartHeight}" width="{chartWidth}" x="0" y="0"></rect>
    </clipPath>
  </defs>
  <g transform="translate({widthLeft + offset}, 0)">
    <G bind:height={heightTop} transform="translate(0, {0})">
      <slot matrix={$matrix} name="top"></slot>
    </G>
    <G bind:height={heightBottom} transform="translate(0,{height-heightBottom})">
      <slot matrix={$matrix} name="bottom"></slot>
    </G>
  </g>

  <g transform="scale(1,-1) translate(0,{-chartHeight-heightTop-offset})">
    <G bind:width={widthLeft}>
      <slot matrix={$matrix} name="left"></slot>
    </G>
    <G bind:width={widthRight} transform="translate({width-widthRight},0)">
      <slot matrix={$matrix} name="right"></slot>
    </G>
    <g clip-path="url(#chartClip)" transform="translate({widthLeft + offset},0)">
      <slot {chartHeight} {chartWidth} matrix={$matrix} name="chart"></slot>
    </g>
  </g>
</svg>
