<script context="module">
  import routes from '../.routify/routes.default.js'
  import {createRouter, Router} from '@roxi/routify'

  const router = createRouter({routes})
</script>

<script lang="ts">
  import {_} from 'src/i18n'
  import Toasts from './components/Toasts.svelte'
</script>

<svelte:head>
  <title>{_('title')}</title>
</svelte:head>

<Toasts/>

<Router {router}/>
