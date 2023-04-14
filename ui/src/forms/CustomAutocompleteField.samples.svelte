<script lang="ts">
  import CustomAutocompleteField from 'src/forms/CustomAutocompleteField.svelte'

  const allOptions = [{name: 'Anton'}, {name: 'Vadim'}, {name: 'Markus'}]
  let query = ''

  $: options = allOptions.filter(u => !query || u.name.toLowerCase().includes(query.toLowerCase()))
</script>

<CustomAutocompleteField label="Label" bind:query {options} optionMapper={u => u.name} placeholder="Search for names, e.g. Anton or Vadim"/>
