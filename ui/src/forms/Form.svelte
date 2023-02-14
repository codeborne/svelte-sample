<script lang="ts">
  import type {FormEventHandler} from 'svelte/elements'

  export let submit: FormEventHandler<HTMLFormElement>

  export let validated = false
</script>

<form on:invalid|capture={() => validated = true} class:validated
      on:submit|preventDefault={submit} class={$$props.class ?? 'spaced'} {...$$restProps}>
  <slot/>
</form>

<style global>
  .validated input:invalid, .validated select:invalid, .validated textarea:invalid, .validated .invalid {
    @apply border-danger-500 ring-danger-500 focus:border-danger-500 focus:ring-danger-500
  }
</style>
