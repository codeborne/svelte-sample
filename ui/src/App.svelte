<script lang="ts">
  import {t} from 'src/i18n'
  import Toasts from './components/Toasts.svelte'
  import NotFoundPage from './layout/NotFoundPage.svelte'
  import HomePage from 'src/pages/HomePage.svelte'
  import Spinner from 'src/components/Spinner.svelte'
  import MockEmailsPage from 'src/prototyping/emails/MockEmailsPage.svelte'
  import MockEmailNotifications from 'src/prototyping/emails/MockEmailNotifications.svelte'
  import {Route, Router} from 'svelte-routing'
</script>

<svelte:head>
  <title>{t.title}</title>
</svelte:head>

<Toasts/>

<Router>
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

    <!--  👇 Prototype only  -->
    <Route path="emails" component={MockEmailsPage}/>
    <Route path="emails/:slug" component={MockEmailsPage}/>
    <MockEmailNotifications />
  </div>
</Router>
