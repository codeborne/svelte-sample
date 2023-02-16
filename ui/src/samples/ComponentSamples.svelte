<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
  import components from 'src/samples/components'
  import {useLocation} from 'svelte-navigator'

  export let path: string

  if (!path) path = components[0]

  const location = useLocation()
</script>

<MainPageLayout title="Component samples">
  <div class="flex items-start gap-10">
    <nav class="nav">
      {#each components as name}
        <Link to="samples/{name}"
              class="nav-link {($location.pathname === '/samples/' + name) && 'active'}"
        >{name}</Link>
      {/each}
    </nav>
    <div>
      {#if path}
        {#await import(`/src/${path}.samples.svelte`)}
          Loading...
        {:then module}
          <svelte:component this={module.default}/>
        {:catch error}
          Failed: {error}
        {/await}
      {/if}
    </div>
  </div>
</MainPageLayout>

<style global>
  .nav {
    @apply flex flex-col space-y-1
  }

  .nav-link {
    @apply font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm rounded-md
  }

  .nav-link.active {
    @apply bg-gray-100
  }
</style>
