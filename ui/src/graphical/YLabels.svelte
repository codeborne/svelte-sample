<script lang="ts">
  import G from 'src/graphical/G.svelte'
  import {getContext} from 'svelte'
  import type {Writable} from 'svelte/store'

  export let data: DOMPoint[] = []

  let matrix: Writable<DOMMatrix> = getContext('matrix')
  let points: DOMPoint[] = []
  $: points = cratePath(data, $matrix)

  function cratePath(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p)
  }

  let width = 0
  export let textAnchor: 'start' | 'end' | 'middle' | 'inherit' = 'start'

</script>
<G bind:width>
  {#each points as {x, y}, i }
    <g transform="translate({textAnchor==='end'? width : 0} {y})">
      <text alignment-baseline="middle" y="0" text-anchor={textAnchor} transform="scale(1,-1)" class="p-4">{data[i].y}</text>
    </g>
  {/each}
</G>
