<script lang="ts">
  import type { ComponentProps } from "svelte";

  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";
  import CheckboxField from 'src/forms/CheckboxField.svelte'

  let modalKind = $state<ModalKind>("default");
  let showModal = $state(false);
  let closeOnOutsideClick = $state(false);

  type ModalKind = ComponentProps<typeof Modal>["kind"];

  const kinds: ModalKind[] = ["xs", "md", "default", "wide", "side", "side-wide", "side-narrow", "full-screen"];

  function handleClick(kind: ModalKind) {
    modalKind = kind;
    showModal = true;
  }
</script>

<div class="grid grid-cols-2 gap-12 lg:grid-cols-4">
  <div class="col-span-4 flex flex-col gap-4 lg:col-span-1">
    <h4 class="text-xs uppercase">Modals</h4>

    <CheckboxField label="Close on outside click (default: false)" bind:checked={closeOnOutsideClick} />

    {#each kinds as kind}
      <Button class="primary" onclick={() => handleClick(kind)}>Show: {kind}</Button>
    {/each}
  </div>
</div>

<Modal title="Modal ({modalKind})" kind={modalKind} bind:show={showModal} {closeOnOutsideClick}>
  <div class="h-40">...</div>
</Modal>
