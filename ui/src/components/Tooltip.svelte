<script lang="ts" context="module">
  let idCounter = 0

  function nextId(prefix = 'uid'): string {
    idCounter += 1
    return `${prefix}-${idCounter}`
  }
</script>

<script lang="ts">
  import Button from 'src/components/Button.svelte'
  import TooltipText from 'src/components/TooltipText.svelte'
  import Modal from 'src/components/Modal.svelte'
  import Icon from 'src/icons/Icon.svelte'

  export let text: string

  let target: HTMLElement
  let hovered = false
  let showModal = false
  let id = nextId('tooltip')

  function showModalOnMobile() {
    if (window.innerWidth <= 768) {
      showModal = true
    }
  }
</script>


<div class="inline-flex items-center gap-1">
    <slot/>
    <button class="relative after:content-[''] after:absolute after:p-6 after:-top-1/3 after:-end-3 after:md:p-0 after:md:m-0 md:cursor-help"
            aria-describedby={id}
            bind:this={target}
            on:mouseenter={() => (hovered = true)}
            on:mouseleave={() => (hovered = false)}
            on:focusin={() => (hovered = true)}
            on:focusout={() => (hovered = false)}
            on:click={showModalOnMobile}
            type="button"
    >
      {#if $$slots.trigger}
        <slot name="trigger"/>
      {:else}
        <Icon name="info-circle"
              class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
      {/if}
    </button>
    <TooltipText {target} visible={hovered} content={text} {id}/>
</div>

<Modal bind:show={showModal} class="text-gray-600">
  <h2 class="h3 modal-title font-display tracking-tight -mt-1.5 mb-3 mr-12">
    <slot/>
  </h2>
  {text}
  <div class="mt-4">
    <Button onclick={() => showModal = false}><span class="min-w-12">OK</span></Button>
  </div>
</Modal>
