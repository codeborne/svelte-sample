<script lang="ts">
  import EstonianAddressSearch from 'src/forms/EstonianAddressSearch.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'
  import type {EstonianAddress} from 'src/api/estonianAddressRegister'

  let address: EstonianAddress
  let showApartments = true
  let searchApartments = true
  let showNonAddressObjects = false
</script>

<CheckboxField bind:checked={showApartments} label="Select apartments"/>
<CheckboxField bind:checked={searchApartments} label="Search for apartments"/>
<CheckboxField bind:checked={showNonAddressObjects} label="Show non address objects"/>
<EstonianAddressSearch bind:address={address} {showApartments} {searchApartments} {showNonAddressObjects}/>

{#if address}
  <div>{address.adr_id || ''} - {address.ipikkaadress || ''}</div>
{/if}
