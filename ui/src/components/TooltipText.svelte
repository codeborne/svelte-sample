<script lang="ts">
  import {fade} from 'svelte/transition'

  export let content: string
  export let target: HTMLElement | null = null
  export let visible = false
  export let id: string

  let tooltipEl: HTMLDivElement | null = null

  $: if (tooltipEl) {
    document.body.appendChild(tooltipEl)
  } else {
    tooltipEl = null
  }

  $: if (tooltipEl && target && visible) {
    const rect = target.getBoundingClientRect()
    const tooltipRect = tooltipEl.clientWidth
    const viewportWidth = window.innerWidth
    const rightSpace = viewportWidth - rect.right
    const placeOnLeft = rightSpace < rect.right - 400
    const top = rect.top + window.scrollY - 10

    if (placeOnLeft) {
      tooltipEl.style.left = `${rect.left - tooltipRect - 12}px`
      tooltipEl.style.top = `${top}px`
    } else {
      tooltipEl.style.left = `${rect.right + 12}px`
      tooltipEl.style.top = `${top}px`
    }
  }
</script>

<div class="hidden">
  {#if visible}
    <div role="tooltip" id={id} transition:fade={{duration: 200}}
         class="hidden md:block absolute z-[1000] bg-gray-50 text-gray-900 border border-gray-200 rounded-sm shadow-lg px-3 py-2 max-w-[500px] text-sm leading-snug pointer-events-none"
         style="top: 0; left: 0;"
         bind:this={tooltipEl}
    >
      {content}
    </div>
  {/if}
</div>
