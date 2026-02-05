<script lang="ts">
  import {lang, langs, rememberLang} from 'src/i18n'
  import Button from 'src/components/Button.svelte'
  import MenuLink from 'src/components/MenuLink.svelte'
  import Menu from 'src/components/Menu.svelte'
  import Dropdown from 'src/components/Dropdown.svelte'

  export let location = window.location

  async function setLang(newLang: string) {
    rememberLang(newLang)
    location.href = location.pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${newLang}$1`)
  }
</script>

<Dropdown>
  <Button size="sm" color="primary" variant="soft" icon="world" class="uppercase">
    {lang}
  </Button>
  {#snippet menu()}
    <Menu class="w-16">
      {#each langs as lang}
        <MenuLink size="sm" class="uppercase whitespace-nowrap" onclick={() => setLang(lang)}>{lang}</MenuLink>
      {/each}
    </Menu>
  {/snippet}
</Dropdown>
