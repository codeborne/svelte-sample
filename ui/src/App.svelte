<script lang="ts">
  import {_} from 'src/i18n'
  import Toasts from './components/Toasts.svelte'
  import {createRouter, Router} from '@roxi/routify'
  import routes from '../.routify/routes.default.js'

</script>

<svelte:head>
  <title>{_('title')}</title>
</svelte:head>

<Toasts/>

<script context="module">
  const router = createRouter({ routes })
</script>

<Router {router} />
