<script lang="ts">
  import PrivateRouteGuard from './PrivateRouteGuard.svelte'
  import {Route} from 'svelte5-router'
  import type {Component} from 'svelte'

  export let path: string
  export let component: Component | undefined = undefined
</script>

<Route {path}>
  {#snippet children(params)}
    <PrivateRouteGuard>
      <slot {params}>
        <svelte:component this={component} {...params}/>
      </slot>
    </PrivateRouteGuard>
  {/snippet}
</Route>
