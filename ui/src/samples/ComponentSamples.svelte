<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
  import components from 'src/samples/components'

  export let name: string

  if (!name) name = components[0]
</script>

<MainPageLayout title="Component samples">
  <div class="flex gap-10">
    <ul>
      {#each components as name}
        <li><Link to="samples/{name}">{name}</Link></li>
      {/each}
    </ul>
    <div>
      {#await import(`src/components/${name}.samples.svelte`)}
        Loading...
      {:then module}
        <svelte:component this={module.default}/>
      {:catch error}
        Failed: {error}
      {/await}
    </div>
  </div>
</MainPageLayout>
