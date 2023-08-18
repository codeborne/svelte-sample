<script lang="ts">
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import {goto} from '@roxi/routify'
  import {samples} from 'src/routes/samples/samples'
  import {onMount} from 'svelte'

  onMount(() => $goto('/samples/[...path]', {path: Object.keys(samples)[0]}))
</script>

<MainPageLayout>
  {Object.keys(samples)[0]}
</MainPageLayout>
