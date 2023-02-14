<script lang="ts">
  import Icon from './Icon.svelte'

  export let contact: string | undefined
  export let icon: string | undefined = undefined

  $: proto = contact?.includes('@') ? 'mailto' : 'tel'
</script>

{#if contact}
  <span class={icon ? 'flex items-center' : ''}>
    {#if icon}<Icon name={icon} class="mr-2"/>{/if}
    <a href="{proto}:{contact}" {...$$restProps}>{contact.replace('@', '\u200B@')}</a>
  </span>
{/if}
