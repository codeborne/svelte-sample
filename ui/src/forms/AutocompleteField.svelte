<script lang="ts">
  import FormField from './FormField.svelte'
  import api from 'src/api/api'
  import {debounce} from '../shared/debounce'
  import {createEventDispatcher} from 'svelte'

  type T = any

  export let label: string|undefined = undefined
  export let apiPath: string
  export let optionMapper: (m: T) => string
  export let selected: T|undefined = undefined
  export let query = selected ? optionMapper(selected) : ''
  export let selectSingleMatch = true

  if ($$restProps.autofocus == undefined) $$restProps.autofocus = true
  else if ($$restProps.autofocus == false) $$restProps.autofocus = undefined

  let matches: T[] = []
  let options: string[] = []

  export let id = apiPath.replace('/', '-')
  const dispatch = createEventDispatcher<{selected: T}>()

  const request = debounce(async (q: string) => {
    const selectedIndex = options.indexOf(q)
    if (selectedIndex >= 0) {
      selected = matches[selectedIndex]
      return dispatch('selected', selected)
    }
    else selected = undefined

    if (q.length >= 3) matches = await api.get(`${apiPath}?q=${encodeURIComponent(q)}`) as any[]
    else matches = []
    options = matches.map(optionMapper)
    if (selectSingleMatch && options.length == 1) {
      if (!options[0].includes(q)) query = options[0]
      selected = matches[0]
    }
  })

  function onQueryChange(query: string) {
    if (query) request(query)
    else {
      matches = options = []
      selected = undefined
    }
  }

  $: onQueryChange(query)
</script>

<FormField {label} type="search" bind:value={query} list="{id}-list" autocomplete="off" {...$$restProps}/>
<datalist id="{id}-list">
  {#each options as o}
    <option>{o}</option>
  {/each}
</datalist>
