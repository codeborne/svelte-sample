<script lang="ts">
  import Icon from 'src/components/Icon.svelte'
  import Link from 'src/components/Link.svelte'
  import {useLocation} from 'svelte-navigator'
  import type icons from 'src/components/icons'

  export let to = ''
  export let icon: keyof typeof icons
  export let label: string

  const location = useLocation()
  $: active = to && $location.pathname.startsWith(to)
</script>

<Link {to} {label} class="flex space-x-2 items-center px-2 py-2 font-medium rounded-md {active ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}">
  <Icon name={icon}/>
</Link>
