<script>
  import Sample from 'src/samples/Sample.svelte'
  import TextAreaField from 'src/forms/TextAreaField.svelte'
</script>

<Sample title="Text area field">
  <div class="w-96 mx-auto">
    <TextAreaField label="TextArea" rows={3} value="Here we have char counter"/>
  </div>
</Sample>
