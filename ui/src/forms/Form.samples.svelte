<script lang="ts">
  import UserForm from 'src/samples/UserForm.svelte'
  import Form from 'src/forms/Form.svelte'
  import FormField from 'src/forms/FormField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Form" description="Always wrap forms into a Form component for validation to work.">
  <UserForm/>
</SampleSection>

<SampleSection title="Pre-validated">
  <Form submit={() => alert('TODO')} validated>
    <FormField label="Invalid"/>
  </Form>
</SampleSection>
