<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
  import {navigate} from 'src/i18n'
  import Card from 'src/components/Card.svelte'

  export let path: string

  const samples = Object.entries(import.meta.globEager('src/**/*.samples.svelte')).map(([p, f]) => [p.replace('/src/', '').replace('.samples.svelte', ''), f]).toObject()
  const groupedMenu = Object.keys(samples).groupBy(p => p.split('/')[0])

  if (!path) navigate('samples/' + Object.keys(samples)[0])
</script>

<MainPageLayout>
  <div class="flex items-start gap-10">
    <nav class="nav">
      {#key path}
        {#each Object.keys(groupedMenu) as dir}
          <div class="nav-group">{dir}</div>
          {#each groupedMenu[dir] as path}
            <Link to="samples/{path}" class="nav-link {location.pathname.endsWith(path) ? 'active': ''}">
              {path.split('/')[1]}
            </Link>
          {/each}
        {/each}
      {/key}
    </nav>

    <div class="w-full">
      <Card title={path.replace('/', ' / ')}>
        <div class="common-grid">
          {#if path}
            <svelte:component this={samples[path].default}/>
          {/if}
        </div>
      </Card>
    </div>
  </div>
</MainPageLayout>

<style>
  .nav {
    @apply flex flex-col
  }

  .nav-group {
    @apply text-gray-400 font-semibold text-xs mb-2 uppercase
  }

  .nav-group:not(:first-of-type) {
    @apply mt-4
  }

  .nav :global(.nav-link) {
    @apply font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center mt-1 px-3 py-2 text-sm rounded-md min-w-[180px]
  }

  .nav :global(.nav-link.active) {
    @apply bg-slate-200
  }
</style>
