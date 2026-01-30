<script lang="ts">
  import type {ComponentProps} from 'svelte'

  import Button from './Button.svelte'
  import Modal from './Modal.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  let modalKind = $state<ModalKind>('default')
  let showModal = $state(false)
  let closeOnOutsideClick = $state(false)

  type ModalKind = ComponentProps<typeof Modal>['kind'];

  const kinds: ModalKind[] = ['xs', 'md', 'default', 'wide', 'side', 'side-wide', 'side-narrow', 'full-screen']

  function handleClick(kind: ModalKind) {
    modalKind = kind
    showModal = true
  }
</script>

<SampleSection title="Modals">
  <div class="grid gap-12 lg:grid-cols-4">
    <div class="flex flex-col gap-4">
      <CheckboxField label="Close on outside click (default: false)" bind:checked={closeOnOutsideClick}/>

      {#each kinds as kind}
        <Button class="primary" onclick={() => handleClick(kind)}>Show: {kind}</Button>
      {/each}
    </div>
  </div>
</SampleSection>

<Modal title="Modal ({modalKind})" kind={modalKind} bind:show={showModal} {closeOnOutsideClick}>
  <div class="h-40">...</div>
</Modal>
