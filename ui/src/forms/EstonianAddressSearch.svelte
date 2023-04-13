<script lang="ts">
  import {debounce} from 'src/shared/debounce'
  import FormField from 'src/forms/FormField.svelte'
  import {_} from 'src/i18n'
  import type {AddressSearch, EstonianAddress, EstonianAddressApartment} from 'src/api/estonianAddressRegister'
  import estonianAddressRegister, {ApartmentSearch} from 'src/api/estonianAddressRegister'

  export let showApartments: true
  export let searchApartments: true
  export let showNonAddressObjects = false
  export let results = 10
  export let address: EstonianAddress | undefined

  let selectedApartment: EstonianAddress | undefined
  let selectedAddress: EstonianAddress | undefined

  $: address = selectedApartment || selectedAddress

  let addresses: EstonianAddress[] = []
  let apartments: EstonianAddressApartment[] | null = null

  let searchString = ''
  let showList = false
  let searchChanged = false
  let selectedRowIndex = 0

  async function search(searchString: string) {
    apartments = null
    searchChanged = false
    if (searchString.length > 2) {
      try {
        addresses = await estonianAddressRegister.searchAddress({
          address: searchString,
          results: results,
          appartment: searchApartments ? ApartmentSearch.SEARCH_WITHOUT_BUILDING_DATA : ApartmentSearch.DO_NOT_SEARCH,
          unik: !showNonAddressObjects,
          iTappAsendus: true
        } as AddressSearch)
        if (addresses.length === 1) select(addresses[0])
        showList = addresses.length > 1
      } catch (e) {
        console.log(e)
        if (e.name !== 'AbortError') throw e
      }
    } else {
      apartments = null
      selectedAddress = undefined
      selectedApartment = undefined
      addresses = []
    }
  }

  const debouncedSearch = debounce(search, 400)
  $: searchChanged && debouncedSearch(searchString)

  function select(address: EstonianAddress) {
    showList = false
    selectedAddress = address
    apartments = showApartments ? address.appartments : null
    searchString = address.ipikkaadress
    selectedApartment = undefined
  }

  async function loadByAdrId(id: string) {
    try {
      selectedApartment = id ? await estonianAddressRegister.getByAdrId(id) : undefined
      searchString = (selectedApartment || selectedAddress)?.ipikkaadress || ''
      showList = false
    } catch (e) {
      console.log(e)
      if (e.name !== 'AbortError') throw e
    }
  }

  function navigateList(e: KeyboardEvent) {
    if (!addresses.length) return
    if (e.key === 'ArrowDown') {
      showList = true
      selectedRowIndex += 1
      if (selectedRowIndex >= addresses.length) selectedRowIndex = addresses.length
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      showList = true
      selectedRowIndex -= 1
      if (selectedRowIndex < 0) selectedRowIndex = 0
      e.preventDefault()
    } else if (e.key === 'Enter') {
      if (showList) select(addresses[selectedRowIndex])
      else showList = true
      e.preventDefault()
    }
  }

  function onChange(e: Event) {
    if (e.target instanceof HTMLSelectElement) loadByAdrId(e.target.value)
  }
</script>

<div class="relative">
  <FormField let:id {...$$restProps}>
    <div class="flex">
      <input type="search" {id} bind:value={searchString} on:keydown={navigateList}
             class={apartments? '!rounded-r-none !border-r-0' : ''}
             on:focus={() => showList = addresses.length > 1}
             on:blur={() => showList = false}
             on:input={() => searchChanged = true}>
      {#if apartments}
        <select class="!rounded-l-none !w-auto !pl-1 !pr-7" on:change={onChange}>
          <option value="">{_('estonianAddressSearch.selectApartment')}</option>
          {#each apartments as apartment}
            <option value={apartment.adr_id}>{apartment.tahis}</option>
          {/each}
        </select>
      {/if}
    </div>
  </FormField>

  {#if showList}
    <div class="absolute rounded shadow bg-white overflow-hidden flex flex-col w-full mt-0 border border-gray-200">
      {#each addresses as address, i}
        <div class="cursor-pointer group border-t"
             on:mousedown={() => select(address)}
             on:mouseover={() => selectedRowIndex = i}>
          <div class="block p-2 border-transparent border-l-4"
               class:border-blue-600={i === selectedRowIndex}
               class:bg-gray-100={i === selectedRowIndex}>
            {address.ipikkaadress}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

