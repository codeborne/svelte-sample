<script lang="ts">
  import {_} from 'src/i18n'
  import {Route, Router} from 'svelte-navigator'
  import Toasts from './components/Toasts.svelte'
  import NotFoundPage from './layout/NotFoundPage.svelte'
  import ComponentsDemo from 'src/pages/ComponentsDemo.svelte'
  import ComponentSamples from 'src/samples/ComponentSamples.svelte'
</script>

<svelte:head>
  <title>{_('title')}</title>
</svelte:head>

<Toasts/>

<Router primary={false}>
  <div class="App min-h-screen flex flex-col">
    <Route path="/" component={ComponentsDemo}/>
    <Route path="/samples/*path" component={ComponentSamples}/>
    <Route component={NotFoundPage}/>
  </div>
</Router>
