<script lang="ts">
  import {debounce} from 'src/shared/debounce'
  import FormField from 'src/forms/FormField.svelte'
  import {_} from 'src/i18n'
  import type {AddressSearch, EstonianAddress, EstonianAddressApartment} from 'src/api/estonianAddressRegister'
  import estonianAddressRegister, {ApartmentSearch} from 'src/api/estonianAddressRegister'
  import CustomAutocompleteField from 'src/forms/CustomAutocompleteField.svelte'

  export let showApartments: true
  export let searchApartments: true
  export let showNonAddressObjects = false
  export let results = 10
  export let address: EstonianAddress | undefined

  let selectedApartment: EstonianAddress | undefined
  let selectedAddress: EstonianAddress | undefined

  $: address = selectedApartment || selectedAddress

  let addresses: EstonianAddress[] = []
  let apartments: EstonianAddressApartment[] | undefined

  let query = ''
  const debouncedSearch = debounce(search, 400)
  $: debouncedSearch(query)

  async function search(query: string) {
    if (query.length > 2) {
      try {
        if (addresses.some(a => a.ipikkaadress == query)) return
        apartments = undefined
        addresses = await estonianAddressRegister.searchAddress({
          address: query,
          results: results,
          appartment: searchApartments ? ApartmentSearch.SEARCH_WITHOUT_BUILDING_DATA : ApartmentSearch.DO_NOT_SEARCH,
          unik: !showNonAddressObjects,
          iTappAsendus: true
        } as AddressSearch)
        if (addresses.length === 1) select(addresses[0])
      } catch (e) {
        console.log(e)
        if (e.name !== 'AbortError') throw e
      }
    } else {
      addresses = []
      apartments = selectedAddress = selectedApartment = undefined
    }
  }

  function select(address: EstonianAddress) {
    selectedAddress = address
    apartments = showApartments ? address.appartments : undefined
    selectedApartment = undefined
  }

  async function refreshAddressWithApartment(adrId: string) {
    try {
      selectedApartment = adrId ? await estonianAddressRegister.getByAdrId(adrId) : undefined
      addresses = [selectedApartment ?? selectedAddress!]
      query = addresses[0]?.ipikkaadress || ''
    } catch (e) {
      if (e.name !== 'AbortError') throw e
    }
  }
</script>

<CustomAutocompleteField bind:query options={addresses} optionMapper={a => a.ipikkaadress} on:selected={e => select(e.detail)} {...$$restProps}>
  {#if apartments}
    <select class="-ml-1 !rounded-l-none !w-auto !pl-2 !pr-7" on:change={e => refreshAddressWithApartment(e.currentTarget.value)} autofocus>
      <option value="">{_('estonianAddressSearch.selectApartment')}</option>
      {#each apartments as apartment}
        <option value={apartment.adr_id}>{apartment.tahis}</option>
      {/each}
    </select>
  {/if}
</CustomAutocompleteField>
