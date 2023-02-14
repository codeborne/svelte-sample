<script lang="ts">
  import {_} from 'src/i18n'
  import {Route, Router} from 'svelte-navigator'
  import Toasts from './components/Toasts.svelte'
  import NotFoundPage from './layout/NotFoundPage.svelte'
  import HomePage from 'src/routes/HomePage.svelte'
</script>

<svelte:head>
  <title>{_('title')}</title>
</svelte:head>

<Toasts/>

<Router primary={false}>
  <div class="App min-h-screen flex flex-col">
    <Route path="/" component={HomePage}/>
    <Route component={NotFoundPage}/>
  </div>
</Router>
