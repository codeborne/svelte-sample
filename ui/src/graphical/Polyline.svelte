<script lang="ts">
  export let matrix: DOMMatrix
  export let data: DOMPoint[] = []

  let points = ''
  $: points = cratePath(data, matrix)

  function cratePath(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p).map(p => `${p.x},${p.y}`).join(' ')
  }
</script>

<polyline {points} {...$$restProps} fill="none"></polyline>

