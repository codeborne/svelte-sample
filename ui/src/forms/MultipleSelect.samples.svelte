<script>
  import MultipleSelect from 'src/forms/MultipleSelect.svelte'
  import Sample from 'src/samples/Sample.svelte'
</script>

<Sample title="Select field">
  <div class="w-64 mx-auto">
    <MultipleSelect label="MultipleSelect" options={{'1': 'a', '2': 'b', '5': 'c'}} values={['1', '5']}/>
  </div>
</Sample>
