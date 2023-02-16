<script lang="ts">
  import {_} from 'src/i18n'
  import {logout, user} from 'src/stores/auth'
  import Logo from 'src/layout/Logo.svelte'
  import LangSelect from 'src/layout/LangSelect.svelte'
  import Button from 'src/components/Button.svelte'
  import Link from 'src/components/Link.svelte'
  import {Role} from 'src/api/types'
  import Badge from 'src/components/Badge.svelte'

  const menu = [
    {path: '', label: 'home.title', roles: [Role.ADMIN, Role.TRAINER, Role.CUSTOMER]},
    {path: 'samples', label: 'Samples', roles: [Role.ADMIN, Role.TRAINER, Role.CUSTOMER]},
  ]
</script>

<header class="py-4 sm:py-8 flex justify-between items-center">
  <Logo/>
  <div class="flex sm:gap-3 items-center">
    {#each menu.filter(m => m.roles.includes($user?.role)) as m}
      <Link to={m.path} label={m.label} class="btn link sm {location.pathname.substring(1).startsWith(m.path) ? 'bg-primary-50' : ''}"/>
    {/each}
    <LangSelect/>
    {#if $user}
      <Badge>
        {$user.firstName} {$user.lastName}
        <Button icon="x" class="sm -mr-2" on:click={logout} title="{_('login.logout')}"/>
      </Badge>
    {:else}
      TODO {_('login.link')}
    {/if}
  </div>
</header>
