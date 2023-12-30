<script lang="ts">
  import {_} from 'src/i18n'
  import {fade, fly} from 'svelte/transition'
  import type {FlyParams} from 'svelte/transition'
  import Icon from 'src/icons/Icon.svelte'
  import {onDestroy} from 'svelte'

  export let title: string = ''
  export let show: any|false = true
  export let wide = false
  export let flyParams: FlyParams = {y: -500, duration: window['e2eTest'] ? 0 : 400}

  let dialog: HTMLDialogElement

  function close() {
    dialog.classList.remove('open')
    show = false
  }

  $: if (dialog) {
    dialog.showModal()
    dialog.classList.add('open')
  }
</script>

{#if show}
  <dialog bind:this={dialog} class="w-full {wide ? 'max-w-7xl': 'max-w-xl'}" transition:fly={flyParams}>
    <div class="absolute top-0 right-0 pt-4 md:pt-8 pr-4 md:pr-8">
      <button type="button" title={_('general.close')} class="close" on:click={close}>
        <Icon name="x"/>
      </button>
    </div>

    {#if title}<h3 class="mb-4">{title}</h3>{/if}
    <slot/>
  </dialog>
{/if}

<style>
  dialog {
    @apply relative bg-white rounded-lg p-6 md:p-10 shadow-xl;
  }

  button.close {
    @apply bg-none flex items-center justify-center text-gray-400 hover:text-gray-500 h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
  }

  dialog::backdrop {
    @apply bg-gray-500 opacity-0;
    transition: opacity 0.4s;
  }

  dialog:global(.open)::backdrop {
    @apply opacity-75;
  }
</style>
