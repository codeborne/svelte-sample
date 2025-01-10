<script lang="ts">
  import {t} from 'src/i18n'
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
    {#snippet menu()}
      <div class="py-0.5 px-1">
        <Button variant="ghost" size="sm" icon="logout" onclick={logout}>
          {t.login.logout}
        </Button>
      </div>
    {/snippet}
  </Dropdown>
{:else}
  TODO {t.login.link}
{/if}
