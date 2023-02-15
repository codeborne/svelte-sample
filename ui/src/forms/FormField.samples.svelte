<script lang="ts">
  import Form from 'src/forms/Form.svelte'
  import FormField from 'src/forms/FormField.svelte'
</script>

<Form submit={() => alert('No submit')}>
  <FormField label="FormField"/>
  <FormField label="FormField" placeholder="Placeholder"/>
  <FormField label="type=email" type="email"/>
  <FormField label="Disabled" disabled/>
  <FormField label="Readonly" readonly/>
  <FormField label="With help" helpText="Mega additional help"/>

  <div class="validated">
    <FormField label="Validated"/>
  </div>
</Form>
