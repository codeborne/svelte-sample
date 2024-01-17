<script lang="ts">
  import icons from './icons'

  export let name: string
  export let size: 'xs' | 'sm' | '' | 'lg' = ''
</script>

{@html icons[name].replace('<svg', `<svg class="icon ${name} ${size} ${$$props.class ?? ''}" focusable="false"`)}

<style global>
  .icon {
    @apply w-5 h-5
  }

  .icon.xs {
    @apply w-3 h-3
  }

  .icon.sm {
    @apply w-4 h-4
  }

  .icon.lg {
    @apply w-6 h-6
  }
</style>
