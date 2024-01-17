<script lang="ts">
  import Logo from 'src/layout/Logo.svelte'
  import LangSelect from 'src/layout/LangSelect.svelte'
  import Navigation from 'src/layout/Navigation.svelte'
  import UserMenu from 'src/layout/UserMenu.svelte'
</script>

<header class="py-4 sm:py-8 flex justify-between items-center">
  <div class="sm:w-60">
    <Logo/>
  </div>

  <div class="mr-auto">
    <Navigation />
  </div>

  <div class="flex sm:gap-3 items-center">
    <LangSelect/>
    <UserMenu />
  </div>
</header>
