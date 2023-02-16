<script lang="ts">
  import icons from 'src/components/icons'
  import Icon from 'src/components/Icon.svelte'
  import Card from 'src/components/Card.svelte'

  const names = Object.keys(icons).sort() as (keyof typeof icons)[]
</script>

<p class="text-lg">
  The base library for the icons is <a href="https://tablericons.com/" target="_blank">TablerIcons</a>
</p>

<div class="grid grid-cols-6 gap-4">
  {#each names as name}
    <Card title={name} class="!mb-2 text-center">
      <Icon {name} class="icon-sm"/>
      <Icon {name}/>
      <Icon {name} class="icon-lg text-primary-500"/>
    </Card>
  {/each}
</div>
