<div class="spinner-container">
  <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9ca3af" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="12" y1="6" x2="12" y2="3"></line>
    <line x1="6" y1="12" x2="3" y2="12"></line>
    <line x1="7.75" y1="7.75" x2="5.6" y2="5.6"></line>
  </svg>
</div>

<style>
  .spinner-container {
    padding: 5rem;
    text-align: center;
  }

  .spinner-container svg {
    text-align: center;
  }

  .animate-spin {
    animation: spin 2s infinite linear;
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
