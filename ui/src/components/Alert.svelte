<div class="alert {$$props.class ?? 'primary'}" role="alert">
  <p class="font-bold">
    <slot/>
  </p>
</div>

<style global>
  .alert {
    @apply relative p-4 rounded-lg;
  }

  .alert:before {
    @apply top-0 left-0 w-1.5 h-full absolute opacity-100 rounded-tl-lg rounded-bl-lg;
    content: "";
  }

  .alert.primary {
    @apply bg-primary-100 text-primary-700 before:bg-primary-500
  }

  .alert.success {
    @apply bg-success-100 text-success-700 before:bg-success-500
  }

  .alert.warning {
    @apply bg-warning-100 text-warning-700 before:bg-warning-500
  }

  .alert.danger {
    @apply bg-danger-100 text-danger-700 before:bg-danger-500
  }
</style>
