<script lang="ts">
  import FormField from './FormField.svelte'
  import api from 'src/api/api'
  import {debounce} from '../shared/debounce'
  import {createEventDispatcher} from 'svelte'

  export let label: string|undefined = undefined
  export let apiPath: string
  export let optionMapper: (m: any) => string
  export let selected: object|undefined = undefined

  export let query = ''
  let matches: any[] = []
  let options: string[] = []

  let id = apiPath.replace('/', '-')

  const dispatch = createEventDispatcher<{selected: object}>()

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
  })

  $: {
    if (query) request(query)
    else {
      matches = options = []
      selected = undefined
    }
  }
</script>

<FormField {id} {label} type="search" bind:value={query} list="{id}-list" autocomplete="off" autofocus {...$$restProps}/>
<datalist id="{id}-list">
  {#each options as o}
    <option>{o}</option>
  {/each}
</datalist>
