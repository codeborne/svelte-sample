<script lang="ts">
  import AutocompleteField from 'src/forms/AutocompleteField.svelte'
</script>

<AutocompleteField label="Label" apiPath="users/search" optionMapper={u => u.name} placeholder="Search for names, e.g. Anton or Erkki"/>
