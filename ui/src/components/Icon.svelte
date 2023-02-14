<script lang="ts">
  import icons from './icons'

  export let name: string
  export let focusable: any = false

  $: icon = icons[name]
</script>

<svg class="icon icon-{name} {$$props.class ?? ''}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
     viewBox="0 0 {icon.box ?? 24} {icon.box ?? 24}" {focusable}>{@html icon.svg}</svg>

<style global>
  .icon {
    @apply w-5 h-5
  }

  .icon-sm {
    @apply w-4 h-4
  }

  .icon-lg {
    @apply w-6 h-6
  }
</style>
