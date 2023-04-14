<div class="spinner w-full text-center {$$props.class ?? 'h-11'}">
  <svg class="animate-spin" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9ca3af" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="12" y1="6" x2="12" y2="3"></line>
    <line x1="6" y1="12" x2="3" y2="12"></line>
    <line x1="7.75" y1="7.75" x2="5.6" y2="5.6"></line>
  </svg>
</div>

<style>
  .animate-spin {
    @apply h-full;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
</style>
