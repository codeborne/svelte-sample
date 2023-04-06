<script lang="ts">
  import UserForm from 'src/samples/UserForm.svelte'
  import Form from 'src/forms/Form.svelte'
  import FormField from 'src/forms/FormField.svelte'
</script>

<p>Always wrap forms into a Form component for validation to work</p>
<UserForm/>

<p>Pre-validated</p>
<Form submit={() => alert('TODO')} validated>
  <FormField label="Invalid"/>
</Form>
