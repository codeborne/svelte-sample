<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Form from 'src/forms/Form.svelte'
  import type {Address} from 'src/api/types'

</script>

<MainPageLayout title={_('title')}>
  <div class="common-grid">

    <h2>More advanced components</h2>
    <Form submit={() => alert('Nowhere to submit')}>
    </Form>
  </div>
</MainPageLayout>
