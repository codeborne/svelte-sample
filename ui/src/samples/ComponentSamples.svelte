<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
  import components from 'src/samples/components'
  import {useLocation} from 'svelte-navigator'
  import {groupBy} from 'src/utils'

  export let path: string

  if (!path) path = components[0]

  const location = useLocation()

  const groupedMenu = groupBy(components, x => x.split('/')[0])
</script>

<MainPageLayout>

  <div class="flex items-start gap-10">
    <nav class="nav">
      {#each Object.keys(groupedMenu) as group}
        <div class="nav-group">{group}</div>
        {#each groupedMenu[group].sort() as name}
          <Link to="samples/{name}"
                class="nav-link {($location.pathname === '/samples/' + name) && 'active'}"
          >{name.split('/')[1]}</Link>
        {/each}
      {/each}
    </nav>
    <div class="w-full">
      {#await import(`/src/${path}.samples.svelte`)}
        Loading...
      {:then module}
        <svelte:component this={module.default}/>
      {:catch error}
        Failed: {error}
      {/await}
    </div>
  </div>
</MainPageLayout>

<style global>
  .nav {
    @apply flex flex-col
  }

  .nav-group {
    @apply text-gray-400 font-semibold text-xs mb-2 uppercase
  }

  .nav-group:not(:first-of-type) {
    @apply mt-4
  }

  .nav-link {
    @apply font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center mt-1 px-3 py-2 text-sm rounded-md min-w-[180px]
  }

  .nav-link.active {
    @apply bg-slate-200
  }
</style>
