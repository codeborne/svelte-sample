<script lang="ts">
  import {onMount} from 'svelte'
  import Link from 'src/components/Link.svelte'
  import {navigate} from 'src/i18n'
  import Logo from 'src/layout/Logo.svelte'
  import SectionsNav from 'src/layout/SectionsNav.svelte'

  export let path: string

  const samples = Object.entries(import.meta.glob('src/**/*.samples.svelte', {eager: true})).map(([p, f]) => [p.replace('/src/', '').replace('.samples.svelte', ''), f]).toObject()
  const groupedMenu = Object.keys(samples).groupBy(p => p.split('/')[0])

  if (!path) navigate('samples/' + Object.keys(samples)[0])

  onMount(() => {
    document.documentElement.classList.add('scroll-smooth')

    return () => {
      document.documentElement.classList.remove('scroll-smooth')
    }
  })
</script>

<div class="sm:flex sm:items-start">

  <div class="form-field w-full sm:hidden">
    <select bind:value={path}>
      {#key path}
        {#each Object.keys(groupedMenu) as group}
          <optgroup label={group}>
            {#each groupedMenu[group] as component}
              <option value={component}>{component.split('/')[1]}</option>
            {/each}
          </optgroup>
        {/each}
      {/key}
    </select>
  </div>

  <div class="hidden sm:flex w-72 p-6 sticky top-0 h-screen overflow-auto">
    <nav class="flex flex-col gap-1">
      <Link to="">
        <Logo class="h-6"/>
      </Link>

      {#key path}
        {#each Object.keys(groupedMenu) as dir}
          <div class="font-semibold text-xs my-3 uppercase">{dir}</div>
          {#each groupedMenu[dir] as path}
            <Link to="samples/{path}"
                  class="{location.pathname.endsWith(path) ? 'text-orange-600': ''} text-sm">
              {path.split('/')[1]}
            </Link>
          {/each}
        {/each}
      {/key}
    </nav>
  </div>

  <div class="w-full">
    {#if path}
      <div class="px-3 pt-3 sm:px-6 sm:pt-8">
        <h4>{path.replace('/', ' / ')}</h4>
        <div class="pt-6">
          {#key path}
            <SectionsNav/>
          {/key}
          <svelte:component this={samples[path].default}/>
        </div>
      </div>
    {/if}
  </div>
</div>

