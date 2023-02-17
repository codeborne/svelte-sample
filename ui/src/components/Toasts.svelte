<script lang="ts">
  import Icon from 'src/icons/Icon.svelte'
  import {hideToast, toastStore} from 'src/stores/toasts'
  import {fly} from 'svelte/transition'
  import {ToastType} from '../stores/toasts'
</script>

<div class="fixed z-50 inset-0 flex items-start pointer-events-none p-6" aria-live="assertive">
  <div class="w-full flex flex-col items-end space-y-4">
    {#each $toastStore as toast}
      <div class="toast max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden" transition:fly={{y: -100}}>
        <div class="p-4">
          <div class="flex items-start">
            <div class="shrink-0">
              {#if toast.type === ToastType.WARNING}
                <Icon name="alert-triangle" class="text-warning-400"/>
              {:else if toast.type === ToastType.SUCCESS}
                <Icon name="circle-check" class="text-success-400"/>
              {:else if toast.type === ToastType.ERROR}
                <Icon name="circle-x" class="text-danger-400"/>
              {:else if toast.type === ToastType.INFO}
                <Icon name="info-circle" class="text-primary-400"/>
              {/if}
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5 whitespace-pre-line">
              {#if toast.title}
                <p class="mb-1 text-sm font-medium text-gray-900">
                  {toast.title}
                </p>
              {/if}
              <p class="text-sm text-gray-500">
                {#if toast.html}
                  {@html toast.message}
                {:else}
                  {toast.message}
                {/if}
              </p>
            </div>
            <div class="ml-4 shrink-0 flex">
              <button on:click={() => hideToast(toast)} class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <Icon name="x"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
