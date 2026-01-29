<script lang="ts">
  import Button from 'src/components/Button.svelte'
  import TooltipText from 'src/components/TooltipText.svelte'
  import Modal from 'src/components/Modal.svelte'
  import Icon from 'src/icons/Icon.svelte'
  import type { Snippet } from 'svelte'

  let { text, children, trigger }: { text: string, children?: Snippet, trigger?: Snippet } = $props()

  let target = $state<HTMLElement>()
  let hovered = $state(false)
  let showModal = $state(false)

  let idCounter = 0
  function nextId(prefix = 'uid'): string {
    idCounter += 1
    return `${prefix}-${idCounter}`
  }
  
  let id = nextId('tooltip')

  function showModalOnMobile() {
    if (window.innerWidth <= 768) {
      showModal = true
    }
  }
</script>


<div class="inline-flex items-center gap-1">
    {@render children?.()}
    <button class="relative after:content-[''] after:absolute after:p-6 after:-top-1/3 after:-end-3 after:md:p-0 after:md:m-0 md:cursor-help"
            aria-describedby={id}
            bind:this={target}
            onmouseenter={() => (hovered = true)}
            onmouseleave={() => (hovered = false)}
            onfocusin={() => (hovered = true)}
            onfocusout={() => (hovered = false)}
            onclick={showModalOnMobile}
            type="button"
    >
      {#if trigger}
        {@render trigger()}
      {:else}
        <Icon name="info-circle"
              class="cursor-help opacity-50 transition-opacity hover:opacity-100 relative"/>
      {/if}
    </button>
    <TooltipText {target} visible={hovered} content={text} {id}/>
</div>

<Modal bind:show={showModal} class="text-gray-600">
  <h2 class="h3 modal-title font-display tracking-tight -mt-1.5 mb-3 mr-12">
    {@render children?.()}
  </h2>
  {text}
  <div class="mt-4">
    <Button onclick={() => showModal = false}><span class="min-w-12">OK</span></Button>
  </div>
</Modal>
