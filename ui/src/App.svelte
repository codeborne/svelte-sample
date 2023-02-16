<script lang="ts">
  import {_} from 'src/i18n'
  import {Route, Router} from 'svelte-navigator'
  import Toasts from './components/Toasts.svelte'
  import NotFoundPage from './layout/NotFoundPage.svelte'
  import HomePage from 'src/pages/HomePage.svelte'
  import Spinner from 'src/components/Spinner.svelte'
</script>

<svelte:head>
  <title>{_('title')}</title>
</svelte:head>

<Toasts/>

<Router primary={false}>
  <div class="App min-h-screen flex flex-col">
    <Route path="/" component={HomePage}/>
    <Route path="/samples/*path" let:params>
      {#await import('src/samples/SamplesPage.svelte')}
        <Spinner/>
      {:then samples}
        <svelte:component this={samples.default} path={params.path}/>
      {/await}
    </Route>
    <Route component={NotFoundPage}/>
  </div>
</Router>
