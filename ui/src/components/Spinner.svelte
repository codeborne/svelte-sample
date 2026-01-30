<script lang="ts">
  let { stroke, size, class: className, color }: { stroke?: string, size?: string, class?: string, color? : string} = $props()
</script>

<div class="spinner w-full text-center {className ?? 'h-11'}">
  <svg
    class="animate-spin h-full {color ?? ''}"
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? '24'}
    height={size ?? '24'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={stroke ?? '1.5'}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>

</div>
