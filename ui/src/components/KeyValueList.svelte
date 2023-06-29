<script lang="ts">
  export let size: '' | 'sm' | 'xs' = ''
</script>

<div class="key-value-list {size} {$$props.class}">
  <slot />
</div>

<style global>
  .key-value-list .key-value-pair {
    @apply flex justify-between py-1.5 items-center
  }

  .key-value-list .key-value-pair:not(:first-of-type) {
    @apply rounded-t-none border-t -mt-[1px]
  }

  .key-value-list  .key-value-pair .key {
    @apply flex-grow
  }

  .key-value-list  .key-value-pair .key,
  .key-value-list  .key-value-pair .value {
    @apply text-base
  }

  .key-value-list .key-value-pair .icon {
    @apply mr-2
  }

  .key-value-list.sm .key-value-pair .key,
  .key-value-list.sm .key-value-pair .value {  @apply text-sm }
  .key-value-list.sm .key-value-pair { @apply py-1 text-sm }
  .key-value-list.xs .key-value-pair .key,
  .key-value-list.xs .key-value-pair .value { @apply text-xs }
  .key-value-list.xs .key-value-pair { @apply py-0.5 }

</style>
