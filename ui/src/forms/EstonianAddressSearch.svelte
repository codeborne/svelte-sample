<script lang="ts">
  import {debounce} from 'src/shared/debounce'
  import {_} from 'src/i18n'
  import type {AddressSearch, EstonianAddress, EstonianAddressApartment} from 'src/api/estonianAddressRegister'
  import estonianAddressRegister, {ApartmentSearch} from 'src/api/estonianAddressRegister'
  import CustomAutocompleteField from 'src/forms/CustomAutocompleteField.svelte'
  import Spinner from 'src/components/Spinner.svelte'

  export let showApartments = true
  export let searchApartments = true
  export let showNonAddressObjects = false
  export let results = 10
  export let address: EstonianAddress | undefined

  let selectedApartment: EstonianAddress | undefined
  let selectedAddress: EstonianAddress | undefined

  $: address = selectedApartment || selectedAddress

  let addresses: EstonianAddress[] = []
  let apartments: EstonianAddressApartment[] | undefined

  let query = '', loading = false
  const debouncedSearch = debounce(search, 400)
  $: debouncedSearch(query)

  async function search(query: string) {
    if (query.length > 2) {
      try {
        if (addresses.some(a => a.ipikkaadress == query)) return
        apartments = undefined
        loading = true
        addresses = await estonianAddressRegister.searchAddress({
          address: query,
          results: results,
          appartment: searchApartments ? ApartmentSearch.SEARCH_WITHOUT_BUILDING_DATA : ApartmentSearch.DO_NOT_SEARCH,
          unik: !showNonAddressObjects,
          iTappAsendus: true
        } as AddressSearch)
      } catch (e) {
        if (e.name !== 'AbortError') throw e
      } finally {
        loading = false
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
  {#if loading}<Spinner class="absolute w-8 h-8 p-1 right-8"/>{/if}
  {#if apartments}
    <select class="-ml-1 !rounded-l-none !w-auto !pl-2 !pr-7" on:change={e => refreshAddressWithApartment(e.currentTarget.value)} autofocus required>
      <option value="">{_('addresses.selectApartment')}</option>
      {#each apartments as apartment}
        <option value={apartment.adr_id}>{apartment.tahis}</option>
      {/each}
    </select>
  {/if}
</CustomAutocompleteField>
