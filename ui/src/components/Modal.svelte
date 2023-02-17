<script lang="ts">
  import {_} from 'src/i18n'
  import {fade, fly} from 'svelte/transition'
  import type {FlyParams} from 'svelte/types/runtime/transition'
  import Icon from 'src/icons/Icon.svelte'
  import {onDestroy} from 'svelte'

  export let title: string = ''
  export let show: any|false = true
  export let wide = false
  export let flyParams: FlyParams = {y: -500, duration: window['e2eTest'] ? 0 : 400}

  let modal: HTMLElement
  $: if (modal) document.body.appendChild(modal)
  $: document.body.classList.toggle('modal-open', show)

  function close() {
    show = false
  }

  function onKeyUp(e: KeyboardEvent) {
    if (show && e.code === 'Escape') close()
  }

  onDestroy(() => {
    document.body.classList.remove('modal-open')
    setTimeout(() => modal?.remove())
  })
</script>

<svelte:window on:keyup={onKeyUp}/>

{#if show}
  <div bind:this={modal} class="modal transition-opacity fixed z-20 inset-0 overflow-y-auto" transition:fade={{duration: flyParams.duration}}>
    <div class="flex items-center justify-center min-h-screen p-4 md:pb-20 text-center">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="w-full {wide ? 'max-w-7xl': 'max-w-xl'} relative inline-block align-bottom bg-white rounded-lg p-6 md:p-10 text-left overflow-hidden shadow-xl transform transition-all align-middle"
           role="dialog" transition:fly={flyParams}>
        <div class="block absolute top-0 right-0 pt-4 md:pt-8 pr-4 md:pr-8">
          <button type="button" class="bg-white flex items-center justify-center text-gray-400 hover:text-gray-500 h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" on:click={close}>
            <span class="sr-only">{_('general.close')}</span>
            <Icon name="x"/>
          </button>
        </div>

        {#if title}<h3 class="mb-4">{title}</h3>{/if}
        <slot/>
      </div>
    </div>
  </div>
{/if}
