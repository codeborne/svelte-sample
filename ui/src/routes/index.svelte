<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import {goto} from '@roxi/routify'
  import {onMount} from 'svelte'

  onMount(() => $goto('/samples'))
</script>

<MainPageLayout title={_('title')}>
  TODO
</MainPageLayout>
