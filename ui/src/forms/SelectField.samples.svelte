<script>
  import SelectField from 'src/forms/SelectField.svelte'
  import Sample from 'src/samples/Sample.svelte'

  const options = {'1': 'a', '2': 'b', '5': 'c'}
</script>

<Sample title="Select field">
  <div class="w-64 mx-auto common-grid">
    <SelectField label="With empty text" {options} emptyOption="Please select something"/>
    <SelectField label="With empty option" {options} emptyOption=""/>
    <SelectField label="No empty option" {options}/>
    <SelectField label="Disabled" {options} disabled/>
  </div>
</Sample>
