<script lang="ts">
  import icons from 'src/components/icons'
  import Icon from 'src/components/Icon.svelte'
</script>

{#each Object.keys(icons) as name}
  <div>
    <Icon {name} class="icon-sm"/>
    <Icon {name}/>
    <Icon {name} class="icon-lg"/>
  </div>
{/each}

<p>
  TablerIcons are used here
</p>
