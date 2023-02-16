<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import TextAreaField from 'src/forms/TextAreaField.svelte'
  import SelectField from 'src/forms/SelectField.svelte'
  import Form from 'src/forms/Form.svelte'
  import type {Address} from 'src/api/types'

</script>

<MainPageLayout title={_('title')}>
  <div class="common-grid">

    <h2>More advanced components</h2>
    <Form submit={() => alert('Nowhere to submit')}>
      <TextAreaField label="TextArea" rows={3} value="Here we have char counter"/>
    </Form>
  </div>
</MainPageLayout>
