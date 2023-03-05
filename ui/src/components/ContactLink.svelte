<script lang="ts">
  import Icon from 'src/icons/Icon.svelte'

  export let contact: string | undefined
  export let icon = ''

  $: proto = contact?.includes('@') ? 'mailto' : 'tel'
</script>

{#if contact}
  <span class={icon ? 'flex items-center' : ''}>
    {#if icon}<Icon name={icon} class="mr-2"/>{/if}
    <a href="{proto}:{contact}" {...$$restProps}>{contact.replace('@', '\u200B@')}</a>
  </span>
{/if}
