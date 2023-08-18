<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
  import Card from 'src/components/Card.svelte'
  import {goto, params} from '@roxi/routify'
  import {samples} from 'src/routes/samples/samples'

  $: path = $params.path.join('/')

  const groupedMenu = Object.keys(samples).groupBy(p => p.split('/')[0])
</script>

<MainPageLayout>
  <div class="sm:flex sm:items-start gap-10">
    <div class="form-field w-full mb-4 sm:hidden">
      <select value={path} on:change={e => $goto('/samples/' + e.currentTarget.value)}>
        {#each Object.keys(groupedMenu) as group}
          <optgroup label={group}>
            {#each groupedMenu[group] as component}
              <option value={component}>{component.split('/')[1]}</option>
            {/each}
          </optgroup>
        {/each}
      </select>
    </div>

    <div class="hidden sm:flex">
      <nav class="nav">
        {#each Object.keys(groupedMenu) as dir}
          <div class="nav-group">{dir}</div>
          {#each groupedMenu[dir] as p}
            <Link to="samples/{p}" class="nav-link {p == path ? 'active': ''}">
              {p.split('/')[1]}
            </Link>
          {/each}
        {/each}
      </nav>
    </div>

    <div class="w-full">
      {#if path}
        <Card title={path.replace('/', ' / ')}>
          <div class="common-grid">
            <svelte:component this={samples[path].default}/>
          </div>
        </Card>
      {/if}
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
