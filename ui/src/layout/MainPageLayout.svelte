<script lang="ts">
  import {_} from 'src/i18n'
  import Container from 'src/layout/Container.svelte'
  import Header from 'src/layout/Header.svelte'

  export let title = ''
  export let width = 'normal'
</script>

<svelte:head>
  {#if title}
    <title>{_('title')} - {title}</title>
  {/if}
</svelte:head>

<div class="min-h-screen relative bg-gray-50">
  <div class="absolute inset-0 flex items-center justify-center -z-10"></div>

  <Container {width}>
    <Header/>

    {#if title}
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-extrabold flex gap-6">{title}</h1>
        <slot name="header"/>
      </div>
    {/if}

    <slot/>
  </Container>
</div>
