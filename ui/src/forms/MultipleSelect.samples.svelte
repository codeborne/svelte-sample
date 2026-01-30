<script>
  import MultipleSelect from 'src/forms/MultipleSelect.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Usage"
               description="Allows users to select multiple options from a predefined list. Pass options as an object with key-value pairs and specify selected values as an array.">
  <MultipleSelect label="MultipleSelect" options={{'1': 'a', '2': 'b', '5': 'c'}} values={['1', '5']}/>
</SampleSection>
