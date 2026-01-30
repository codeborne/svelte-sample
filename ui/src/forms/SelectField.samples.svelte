<script>
  import {t} from 'src/i18n'
  import SelectField from 'src/forms/SelectField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const options = {'1': 'a', '2': 'b', '5': 'c'}
</script>

<SampleSection title="Examples">
  <div class="w-64 common-grid">
    <SelectField label="With empty text" {options} emptyOption="Please select something"/>
    <SelectField label="With empty option" {options} emptyOption=""/>
    <SelectField label="No empty option" {options}/>
    <SelectField label="Disabled" {options} disabled/>
    <SelectField label="Options from translations" options={t.general}/>
  </div>
</SampleSection>
