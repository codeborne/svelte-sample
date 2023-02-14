<script lang="ts">
  import {navigate} from 'src/i18n'
  import {user} from 'src/stores/auth'

  $: if (!$user) navigate('login', {state: {from: location.pathname}, replace: true})
</script>

{#if $user}
  <slot/>
{/if}
