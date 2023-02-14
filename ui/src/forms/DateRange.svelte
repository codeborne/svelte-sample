<script lang="ts">
  import FormField from 'src/forms/FormField.svelte'
  import {today, yesterday} from '../i18n'

  export let from: string
  export let until: string

  if (!until) until = today
  if (!from) from = yesterday
</script>

<div class={$$props.class ?? ''}>
  <div class="md:flex align-items-center">
    <FormField type="date" bind:value={from}/>
    <span class="mx-1 my-2">-</span>
    <FormField type="date" bind:value={until}/>
  </div>
</div>
