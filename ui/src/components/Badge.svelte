<script lang="ts">
  export let title: string|undefined = undefined
</script>

<span class="badge {$$props.class ?? ''}" {title}>
  <slot/>
</span>

<style global>
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-md font-medium text-gray-800 bg-primary-100
  }

  .badge.success {
    @apply bg-success-100
  }

  .badge.danger {
    @apply bg-danger-100
  }

  .badge.warning {
    @apply bg-warning-100
  }

  .badge.info {
    @apply bg-blue-200
  }
</style>
