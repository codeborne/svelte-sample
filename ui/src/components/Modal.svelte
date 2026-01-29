<script lang="ts">
  import type { Snippet } from "svelte";
  import type { FadeParams, FlyParams, ScaleParams } from "svelte/transition";
  import { fade, fly, scale } from "svelte/transition";
  import Button from "./Button.svelte";
  import Icon from 'src/icons/Icon.svelte'

  type CloseReason = "backdrop" | "escape" | "close";

  interface Props {
    show: boolean;
    title?: string;
    kind?: "xs" | "md" | "default" | "wide" | "side" | "side-wide" | "side-narrow" | "full-screen";
    class?: string;
    overlayClass?: string;
    dialogClass?: string;
    children: Snippet;
    onclose?: (ev: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
    closeable?: boolean;
    closeOnOutsideClick?: boolean;
  }

  let {
    show = $bindable(),
    title,
    kind = "default",
    class: modalClass = "",
    overlayClass = "",
    dialogClass = "",
    children,
    onclose,
    closeable = true,
    closeOnOutsideClick = false,
  }: Props = $props();

  const fadeParams: FadeParams = { duration: 300 };
  const scaleParams: ScaleParams = { start: 0.9, duration: fadeParams.duration };
  const flyParams: FlyParams = { x: 300, duration: 100 };

  function portal(node: HTMLElement) {
    document.body.appendChild(node);

    return {
      destroy() {
        node.remove();
      }
    };
  }

  function close(ev: MouseEvent | KeyboardEvent, reason: CloseReason = "close") {
    onclose?.(ev, reason);

    if (!ev.defaultPrevented) {
      show = false;
    }
  }

  function onKeyUp(ev: KeyboardEvent) {
    if (show && ev.code === "Escape") {
      close(ev, "escape");
    }
  }

  function animateIn(node: Element) {
    return kind === "side" || kind === "side-wide" || kind === "side-narrow"
      ? fly(node, flyParams)
      : scale(node, scaleParams);
  }

  function animateOut(node: Element) {
    return fade(node, fadeParams);
  }

  function handleOverlayClick(ev: MouseEvent) {
    if (closeOnOutsideClick) {
      close(ev, "backdrop");
    }
  }
</script>

<svelte:window on:keyup={onKeyUp} />

{#if show}
  <div class="modal {`modal-${kind}`} {modalClass}" use:portal transition:animateOut data-state={show ? "open" : "closed"}>
    <div class="modal-positioner">
      <div class="modal-overlay {overlayClass}" onclick={handleOverlayClick} role="presentation"></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="modal-vertical-aligner" aria-hidden="true">&ZeroWidthSpace;&ZeroWidthSpace;</span>

      <div class="modal-dialog px-6 pb-6 {dialogClass}" role="dialog" transition:animateIn>
        <div class="modal-header -mr-4">
          {#if closeable}
            <div class="absolute top-0 right-0 mt-2">
              <Button circular size="lg" variant="ghost" onclick={(ev) => close(ev, "close")}>
                <span class="sr-only">Close</span>
                <Icon name="x" size="lg" />
              </Button>
            </div>
          {/if}

          {#if title}
            <h4 class="p-0 pb-4 text-xl font-semibold">
              {title}
            </h4>
          {/if}
        </div>
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "./../global.css";

  .modal {
    @apply fixed inset-0 z-30 overflow-y-auto transition-opacity;
  }

  .modal-dialog {
    @apply relative inline-block w-full transform overflow-hidden overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all dark:bg-black;
  }

  .modal-header {
    @apply sticky top-0 z-50 bg-inherit pt-6;
  }

  .modal-overlay {
    @apply bg-neutral-400/75 dark:bg-neutral-800/75 fixed inset-0 transition-opacity dark:opacity-75;
  }

  .modal-vertical-aligner {
    @apply hidden sm:inline-block sm:h-screen sm:align-middle;
  }

  .modal-positioner {
    @apply flex min-h-screen items-center justify-center p-4 text-center md:pb-20;
  }

  .modal-default .modal-dialog {
    @apply relative inline-block rounded-lg sm:max-w-3xl;
  }

  .modal-default .modal-positioner {
    @apply items-center justify-center px-4 py-4 sm:p-0;
  }

  .modal-wide .modal-positioner {
    @apply items-center justify-center px-4 py-4 sm:p-0;
  }

  .modal-wide .modal-dialog {
    @apply relative my-4 inline-block max-w-6xl rounded-lg;
  }

  .modal-md .modal-positioner {
    @apply items-center justify-center px-4 py-4 sm:p-0;
  }

  .modal-md .modal-dialog {
    @apply relative my-4 inline-block rounded-lg sm:max-w-4xl;
  }

  .modal-xs .modal-dialog {
    @apply relative my-4 inline-block max-w-xl rounded-lg;
  }

  .modal-side .modal-positioner {
    @apply justify-end;
  }

  .modal-side .modal-dialog {
    @apply fixed inset-y-0 right-0 overflow-y-auto rounded-none sm:max-w-3xl;
  }

  .modal-side-wide .modal-dialog {
    @apply fixed inset-y-0 right-0 max-w-6xl overflow-y-auto rounded-none;
  }

  .modal-side-narrow .modal-dialog {
    @apply fixed inset-y-0 right-0 max-w-sm overflow-y-auto rounded-none shadow-2xl;
  }

  .modal-full-screen .modal-positioner {
    @apply justify-end;
  }

  .modal-full-screen .modal-dialog {
    @apply fixed inset-0 flex flex-col overflow-hidden;
  }
</style>
