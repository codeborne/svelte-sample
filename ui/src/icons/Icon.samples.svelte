<script lang="ts">
  import icons from './icons'
  import Icon from './Icon.svelte'
  import Card from 'src/components/Card.svelte'
  import Button from 'src/components/Button.svelte'
  import {showToast, ToastType} from 'src/stores/toasts'

  const names = Object.keys(icons).sort()

  function copy(element: string) {
    console.log('copying')
    navigator.clipboard.writeText(element)
    showToast('Copied!', {type: ToastType.SUCCESS})
  }
</script>

<div class="text-lg common-grid mb-4">
  <p>
    The base library for the icons is <a href="https://tablericons.com/" target="_blank">TablerIcons</a><br>
    Save new icons into src/icons as *.svg files, remove class attribute and change stroke="currentColor".<br>
  </p>
  <h4 class="mt-4">Stroke width customization</h4>
  <div>
    <p>By default stroke width for icons is 2, but it can be changed by variable strokeWidth.</p>
    <p>Recommended to use when icon comes with text, to add consistency between font and icon strokes.</p>
    <p>Another good use case is for huge icons used as an eye catcher.</p>
  </div>
  <div class="grid grid-cols-4 gap-4">
    <Card size="sm">
      <Icon name='user' size="xs" strokeWidth="2.5"/>
      <Icon name='user'/>
      <Icon name='user' size="lg" strokeWidth="3"/>
      <Icon name='user' size="lg" strokeWidth="1"/>
    </Card>
    <Card size="sm">
      <div class="flex gap-2 items-center">
      <Icon name='user' size="lg" strokeWidth="3"/>
      <div class="font-bold">Jaan Tamm</div>
      </div>
    </Card>
    <Card size="sm">
      <div class="flex gap-2 items-center">
      <Icon name='user'/>
      <div>Jaan Tamm</div>
      </div>
    </Card>
    <Card size="sm">
      <Button label="Jaan Tamm" icon="user" size="lg"/>
    </Card>
  </div>
</div>

<h4>List of icons</h4>
<div class="grid grid-cols-6 gap-4">
  {#each names as name}
    <Card size="sm" on:click={() => copy(name)}>
      <div class="flex flex-col gap-1">
        <Icon {name} size="xs"/>
        <Icon {name} size="sm"/>
        <Icon {name}/>
        <Icon {name} size="lg" class="text-primary-500" strokeWidth="2"/>
        <div class="mt-1 text-xs">{name}</div>
      </div>
    </Card>
  {/each}
</div>
