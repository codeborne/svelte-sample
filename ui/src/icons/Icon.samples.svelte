<script lang="ts">
  import icons from './icons'
  import Icon from './Icon.svelte'
  import Card from 'src/components/Card.svelte'

  const names = Object.keys(icons).sort()
</script>

<p class="text-lg">
  The base library for the icons is <a href="https://tablericons.com/" target="_blank">TablerIcons</a><br>
  Save new icons into src/icons as *.svg files, remove class attribute and change stroke="currentColor".
</p>

<div class="grid grid-cols-6 gap-4">
  {#each names as name}
    <Card title={name} class="!mb-2 text-center">
      <Icon {name} size="xs"/>
      <Icon {name} size="sm"/>
      <Icon {name}/>
      <Icon {name} size="lg" class="text-primary-500"/>
    </Card>
  {/each}
</div>
