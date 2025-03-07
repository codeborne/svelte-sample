<div class="card-list {$$props.class}">
  <slot />
</div>

<style global lang="postcss">
  @reference "../../global.css";

  .card-list {
    @apply rounded-md;
  }

  .card-list .card {
    @apply border-0;
  }

  .card-list .card:not(:first-of-type) {
    @apply rounded-t-none border-t -mt-[1px] border-stone-200;
  }

  .dark .card-list .card:not(:first-of-type) {
    @apply border-stone-700;
  }

  .card-list .card:not(:first-of-type) .card-header {
    @apply rounded-t-none;
  }

  .card-list .card:not(:last-of-type) {
    @apply rounded-b-none;
  }

  .card-list .card:not(:last-of-type) .card-header {
    @apply rounded-b-none;
  }

  .card-list .card-header {
    @apply border-b-0;
  }

  .card-list .card-header + .card-body {
    @apply pt-0;
  }
</style>
