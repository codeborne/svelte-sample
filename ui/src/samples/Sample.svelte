<script lang="ts">
  export let title = ''
</script>

<h3 class="text-sm font-medium leading-7 text-gray-600 mb-3">{title}</h3>
<div class="border rounded-lg p-8 w-full mb-8 {$$restProps.class ?? ''}">
  <slot></slot>
</div>
