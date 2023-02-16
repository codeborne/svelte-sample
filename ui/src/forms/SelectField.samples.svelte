<script>
  import SelectField from 'src/forms/SelectField.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Select field">
  <div class="w-64 mx-auto">
    <SelectField label="SelectField" options={{'1': 'a', '2': 'b', '5': 'c'}} emptyOption="Please select something"/>
  </div>
</Sample>
