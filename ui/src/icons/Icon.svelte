<script lang="ts">
  import icons from './icons'

  export let name: string
  export let size: '' | 'sm' | 'lg' = ''
</script>

{@html icons[name].replace('<svg', `<svg class="icon ${name} ${size} ${$$props.class ?? ''}" focusable="false"`)}

<style global>
  .icon {
    @apply w-5 h-5
  }

  .icon.sm {
    @apply w-4 h-4
  }

  .icon.lg {
    @apply w-6 h-6
  }
</style>
