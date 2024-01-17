<script lang="ts">
  import {_} from 'src/i18n'
  import Icon from 'src/icons/Icon.svelte'

  export let title = ''
  export let show: any | false = true
  export let wide = false

  let dialog: HTMLDialogElement
  $: if (dialog) dialog.showModal()
</script>

{#if show}
  <dialog bind:this={dialog} class="modal w-full {wide ? 'max-w-7xl': 'max-w-xl'}" on:close={() => setTimeout(() => show = false, 500)}>
    <form method="dialog" class="absolute top-0 right-0 pt-4 md:pt-8 pr-4 md:pr-8">
      <button title={_('general.close')} class="close">
        <Icon name="x"/>
      </button>
    </form>

    {#if title}<h3 class="mb-4">{title}</h3>{/if}
    <slot/>
  </dialog>
{/if}

<style>
  dialog {
    @apply fixed bg-white rounded-lg p-6 md:p-10 shadow-xl;
    overflow: hidden;
    animation: fade-out 0.2s ease-in;
  }

  dialog[open] {
    @apply opacity-100;
    animation: fade-in 0.3s ease-out;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
      display: none;
    }

    100% {
      opacity: 1;
      display: block;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      display: block;
    }

    100% {
      opacity: 0;
      transform: scale(0.95);
      display: none;
    }
  }

  button.close {
    @apply bg-none flex items-center justify-center text-gray-400 hover:text-gray-500 h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500;
  }

  dialog::backdrop {
    @apply bg-gray-500/70;
    /* TODO: make the backdrop also fade out */
    /*animation: backdrop-fade-out 0.2s ease-in;*/
  }

  dialog[open]::backdrop {
    animation: backdrop-fade-in 0.2s ease-out;
  }

  @keyframes backdrop-fade-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  /*@keyframes backdrop-fade-out {*/
  /*  0% {*/
  /*    opacity: 1*/
  /*  }*/
  /*  100% {*/
  /*    opacity: 0*/
  /*  }*/
  /*}*/
</style>
