<script lang="ts">
  import PrivateRouteGuard from './PrivateRouteGuard.svelte'
  import {Route} from 'svelte-routing'
  import type {Component} from 'svelte'

  export let path: string
  export let component: Component | undefined = undefined
</script>

<Route {path} let:params>
  <PrivateRouteGuard>
    <slot {params}>
      <svelte:component this={component} {...params} />
    </slot>
  </PrivateRouteGuard>
</Route>
