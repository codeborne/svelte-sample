<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import UserForm from 'src/pages/UserForm.svelte'
</script>

<MainPageLayout title={_('title')}>
  <div class="common-grid">
    <h2>Sample user form</h2>
    <UserForm/>
  </div>
</MainPageLayout>
