<script>
  import EstonianAddressSearch from 'src/forms/EstonianAddressSearch.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'

  let address
  let showApartments = true
  let searchApartments = true
  let showNonAddressObjects = false
</script>
<CheckboxField bind:checked={showApartments} label="Select apartments"/>
<CheckboxField bind:checked={searchApartments} label="Search for apartments"/>
<CheckboxField bind:checked={showNonAddressObjects} label="Show non address objects"/>
<EstonianAddressSearch bind:address={address} {showApartments} {searchApartments} {showNonAddressObjects}/>
<div>
  <span>{address?.adr_id || ''}</span> - <span>{address?.ipikkaadress || ''}</span>
</div>





