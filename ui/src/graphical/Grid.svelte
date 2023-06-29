<script lang="ts">
  import type {Writable} from 'svelte/store'
  import {getContext} from 'svelte'

  let matrix: Writable<DOMMatrix> = getContext('matrix')
  export let dataX: DOMPoint[] = []
  export let dataY: DOMPoint[] = []
  export let chartWidth = 0
  export let chartHeight = 0

  let pointsX: DOMPoint[] = []
  $: pointsX = transform(dataX, $matrix)
  let pointsY: DOMPoint[] = []
  $: pointsY = transform(dataY, $matrix)

  function transform(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p)
  }
</script>
{#each pointsX as {x, w}, i }
  <line x1={x} y1="0" x2={x} y2={chartHeight} stroke="gray" stroke-width={dataX[i].x%10===0?2:1}></line>
{/each}

{#each pointsY as {y, w}, i }
  <line x1=0 y1={y} x2={chartWidth} y2={y} stroke="gray" stroke-width={dataY[i].y===0?3:1}></line>
{/each}
