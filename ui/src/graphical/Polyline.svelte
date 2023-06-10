<script lang="ts">
  import type {Writable} from 'svelte/store'
  import {getContext} from 'svelte'

  let matrix: Writable<DOMMatrix> = getContext('matrix')
  export let data: DOMPoint[] = []

  let points = ''
  $: points = cratePath(data, $matrix)

  function cratePath(data: DOMPoint[], matrix: DOMMatrix) {
    return (data ?? []).map(p => matrix?.transformPoint(p) ?? p).map(p => `${p.x},${p.y}`).join(' ')
  }
</script>

<polyline {points} {...$$restProps} fill="none"></polyline>

