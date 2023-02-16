<script lang="ts">
  import icons from 'src/components/icons'
  import Icon from 'src/components/Icon.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<p class="text-lg mb-10">
  The base library for the icons is <a href="https://tablericons.com/" target="_blank">TablerIcons</a>
</p>


<div class="grid grid-cols-6 gap-4">
  {#each Object.keys(icons) as name}
    <div>
      <Sample title={name} class="!mb-2">
        <Icon {name} class="icon-sm"/>
        <Icon {name}/>
        <Icon {name} class="icon-lg text-primary-500"/>
      </Sample>
    </div>
  {/each}
</div>
