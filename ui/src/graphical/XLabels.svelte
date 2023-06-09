<script lang="ts">
  export let matrix: DOMMatrix
  export let data: DOMPoint[] = []

  let points: DOMPoint[] = []
  $: points = cratePath(data, matrix)

  function cratePath(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p)
  }
</script>
{#each points as {x, y}, i }
  <text {x} y="1rem" text-anchor="middle">{data[i].x}</text>
{/each}

