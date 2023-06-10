<script lang="ts">
  import G from 'src/graphical/G.svelte'

  export let matrix: DOMMatrix
  export let data: DOMPoint[] = []

  let points: DOMPoint[] = []
  $: points = cratePath(data, matrix)

  function cratePath(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p)
  }

  let height = 0
</script>
<G bind:height transform="translate(0,{height/2})">
  {#each points as {x, y}, i }
    <text alignment-baseline="middle" {x} y="0" text-anchor="middle">{data[i].x}</text>
  {/each}
</G>
