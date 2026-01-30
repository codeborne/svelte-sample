<script lang="ts">
  import Form from 'src/forms/Form.svelte'
  import FormField from 'src/forms/FormField.svelte'
  import {today} from 'src/i18n'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Default"
               description="All form fields are required by default.">
  <div class="common-grid sm:grid-cols-2">
    <Form submit={() => alert('No submit')}>
      <FormField label="FormField"/>
      <FormField label="FormField" placeholder="Placeholder"/>
      <FormField label="Disabled" disabled/>
      <FormField label="Readonly" readonly/>
      <FormField label="Not required" required={false}/>
      <FormField label="With help" helpText="Mega additional help"/>

      <div class="validated">
        <FormField label="Validated"/>
      </div>
    </Form>
  </div>
</SampleSection>

<SampleSection title="Validation by input types">
  <div class="common-grid sm:grid-cols-2">
    <Form submit={() => alert('No submit')}>
      <FormField label="type=email" type="email"/>
      <FormField label="type=date, max=today" type="date" max={today}/>
      <FormField label="type=time" type="time"/>
      <FormField label="type=datetime" type="datetime"/>
      <FormField label="type=search" type="search"/>
    </Form>
  </div>
</SampleSection>
