<script lang="ts">
  export let width = 'normal'

  const widthClass = width == 'narrow' ? 'max-w-4xl' : width == 'full' ? '' : 'max-w-screen-2xl'
</script>

<div class="mx-auto px-4 sm:px-6 w-full {widthClass} {$$restProps.class ?? ''}">
  <slot/>
</div>
