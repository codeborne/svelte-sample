<script>
  import FormSection from 'src/forms/FormSection.svelte'
  import FormField from 'src/forms/FormField.svelte'
  import Button from 'src/components/Button.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
  import Card from 'src/components/Card.svelte'
</script>


<SampleSection title="Usage">
  <div>
    <p>Form section can be useful to be used in combination with cards.</p>
    <p class="mb-12">Using form section without a title and description can help aligning a more global submit
      button.</p>
  </div>

  <Card>
    <FormSection title="Form section"
                 description="Here could be some helpful information about the form contents"
                 icon="info-circle"
    >
      <FormField label="Some field"/>
      <FormField label="Some field"/>
    </FormSection>

    <FormSection title="Another form section"
                 description="Here could be some helpful information about the form contents"
                 icon="alert-triangle"
    >
      <FormField label="Some field"/>
      <FormField label="Some field"/>
    </FormSection>

    <FormSection>
      <Button label="Submit" class="success" size="lg"/>
    </FormSection>
  </Card>
</SampleSection>
