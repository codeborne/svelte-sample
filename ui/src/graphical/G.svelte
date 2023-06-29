<script lang="ts">
  import {afterUpdate} from 'svelte'

  export let width: number = 0
  export let height: number = 0

  let g: SVGGraphicsElement

  afterUpdate(() => g && ({width, height} = g.getBBox()))
</script>

<g {...$$restProps} bind:this={g}><slot/></g>
