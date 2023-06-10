<script lang="ts">
  import G from 'src/graphical/G.svelte'

  export let matrix: DOMMatrix
  export let data: DOMPoint[] = []

  let points: DOMPoint[] = []
  $: points = cratePath(data, matrix)

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
