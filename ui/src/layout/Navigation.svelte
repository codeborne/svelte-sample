<script>
  import {Role} from 'src/api/types'
  import {user} from 'src/stores/auth'
  import Link from 'src/components/Link.svelte'

  const menu = [
    {path: '', label: 'home.title', roles: [Role.ADMIN, Role.TRAINER, Role.CUSTOMER]}
  ]

</script>

{#each menu.filter(m => m.roles.includes($user?.role)) as m}
  <Link to={m.path} label={m.label} class="btn soft primary sm {location.pathname.substring(1).startsWith(m.path) ? 'bg-primary-50' : ''}"/>
{/each}

