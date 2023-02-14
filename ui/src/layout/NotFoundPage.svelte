<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from './MainPageLayout.svelte'
  import {onMount} from 'svelte'

  let show = false
  onMount(() => setTimeout(() => show = true, 500))
</script>

<svelte:head>
  <meta name="robots" content="noindex">
</svelte:head>

<MainPageLayout>
  {#if show}
    <div class="sm:flex justify-center md:pt-20">
      <h1 class="text-primary-500 sm:text-5xl">404</h1>
      <div class="sm:ml-6">
        <div class="sm:border-l sm:border-gray-200 sm:pl-6">
          <h1 class="tracking-tight sm:text-5xl">{_('errors.notFound')}</h1>
          <p class="mt-1 text-base text-gray-500">{_('errors.notFoundInstructions')}</p>
        </div>
      </div>
    </div>
  {/if}
</MainPageLayout>
