<script>
  import {_} from 'src/i18n'
  import {logout, user} from 'src/stores/auth'
  import Icon from 'src/icons/Icon.svelte'
  import Dropdown from 'src/components/Dropdown.svelte'
  import Button from 'src/components/Button.svelte'

  let isDropdownOpen = false
</script>

{#if $user}
  <Dropdown class="right-0 !z-50" bind:open={isDropdownOpen}>
    <Button class="sm" color="primary" variant="soft">
      <div class="flex items-center gap-1 -mx-0.5">
        <Icon name="user" strokeWidth="1.5"/>
        <div>{$user.firstName} {$user.lastName}</div>
        <Icon name="chevron-down" class="opacity-50"/>
      </div>
    </Button>
    <svelte:fragment slot="open">
      <div class="py-0.5 px-1">
        <Button variant="ghost" size="sm" icon="logout" on:click={logout}>
          {_('login.logout')}
        </Button>
      </div>
    </svelte:fragment>
  </Dropdown>
{:else}
  TODO {_('login.link')}
{/if}
