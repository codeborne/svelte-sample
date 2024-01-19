<script lang="ts">

  import {showToast, ToastType} from 'src/stores/toasts'
  import {onMount} from 'svelte'

  onMount(() => {
    showToast('Changes were saved', {type: ToastType.SUCCESS, timeoutSec: 1000})
    showToast('An explanation on what happened', {title: 'This is a warning toast', timeoutSec: 1000, type: ToastType.WARNING})
    showToast('Please check your internet connection', {
      title: 'Cannot connect to server',
      timeoutSec: 1000,
      type: ToastType.ERROR
    })
    showToast('Refresh the page to get the latest version', {
      title: 'New version available',
      timeoutSec: 1000,
      type: ToastType.INFO
    })
    showToast('Toast description', {title: 'Toast title', timeoutSec: 1000, html: true})
    showToast('Toast with only a description', {timeoutSec: 1000, html: true})
  })
</script>

<div class="max-w-[450px] common-grid mb-4">
    <h4>Simple, short messages</h4>
    <p>It is OK to use just toast message/description. If it fits into a single line, it is a short message.</p>
</div>

  <div class="max-w-[450px] common-grid">
    <h4>Longer messages</h4>
    <p>Use a short title conveying the idea. The longer content should be as a message/description</p>
  </div>
