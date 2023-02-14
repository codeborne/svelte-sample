<script lang="ts">
  export let value: number
  export let min: number
  export let max: number
  export let step = 1
</script>

<div class="text-sm text-muted flex items-center {$$props.class ?? ''}">
  {min}
  <input type="range" class="mx-3 w-full h-3 rounded-xl" bind:value {min} {max} {step}>
  {max}
</div>

<style>
  input {
    @apply appearance-none py-4;
  }

  input::-webkit-slider-runnable-track {
    @apply bg-white h-2 bg-gray-300 appearance-none mt-4 rounded-xl my-4;
  }

  input::-webkit-slider-thumb {
    @apply h-4 w-4 cursor-ew-resize bg-gray-500 rounded-xl shadow-primary-200 appearance-none -mt-1;
  }

  input:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 1px #fdfdfd, 0 0 0 0.2rem #6b7280;
  }

  input::-moz-range-progress {
    @apply bg-primary-200;
  }

  input::-moz-range-track {
    @apply bg-gray-300;
  }
</style>
