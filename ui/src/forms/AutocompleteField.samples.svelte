<script lang="ts">
  import AutocompleteField from 'src/forms/AutocompleteField.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
  import CustomAutocompleteField from 'src/forms/CustomAutocompleteField.svelte'
  import EstonianAddressSearch from 'src/forms/EstonianAddressSearch.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'
  import type {EstonianAddress} from 'src/api/estonianAddressRegister'

  const allOptions = [{name: 'Anton'}, {name: 'Vadim'}, {name: 'Markus'}]
  let query = ''

  let address: EstonianAddress
  let showApartments = true
  let searchApartments = true
  let showNonAddressObjects = false

  $: options = allOptions.filter(u => !query || u.name.toLowerCase().includes(query.toLowerCase()))
</script>

<SampleSection title="Default"
               description="Fetches options from an API endpoint. Uses native HTML datalist for suggestions.">
  <AutocompleteField label="Label" apiPath="users/search" optionMapper={u => u.name} placeholder="Search for names, e.g. Anton or Erkki"/>
</SampleSection>

<SampleSection title="Custom Autocomplete Field"
               description="Works with local data you provide. Renders a custom dropdown with full keyboard navigation and styling control.">
  <CustomAutocompleteField label="Label" bind:query {options} optionMapper={u => u.name} placeholder="Search for names, e.g. Anton or Vadim"/>
</SampleSection>

<SampleSection title="Estonian Address Search"
               description="An advanced example of an autocomplete field integrated with the Estonian Address Register API.">
  <CheckboxField bind:checked={showApartments} label="Select apartments"/>
  <CheckboxField bind:checked={searchApartments} label="Search for apartments"/>
  <CheckboxField bind:checked={showNonAddressObjects} label="Show non address objects"/>
  <EstonianAddressSearch bind:address={address} {showApartments} {searchApartments} {showNonAddressObjects}/>

  {#if address}
    <div>{address.adr_id || ''} - {address.ipikkaadress || ''}</div>
  {/if}
</SampleSection>
