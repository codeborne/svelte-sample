<script lang="ts">
  export let label: string
  export let value: string | undefined
  export let required = true
  export let options: Record<string, string>
  export let id = Math.floor(Math.random() * 100).toString()

  $: if (value && options[value!] == undefined) value = undefined

  function deselect(option?: string) {
    if (value === option) value = undefined
  }

  const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
</script>

<fieldset {...$$restProps} class="{$$props.class}" id={`group-${id}`} role="radiogroup">
  <legend id={`label-${id}`} class="w-full">{label}</legend>
  {#each Object.entries(options) as [option, label]}
    {@const oid = id + slugify(option)}
    <div class="flex items-center">
      <input id={oid} type="radio" {required} bind:group={value}
             on:click={() => deselect(option)}
             name={id} value={option}>
      <label for={oid}>
        <slot option={option}>{label}</slot>
      </label>
    </div>
  {/each}
</fieldset>


<style>
  fieldset {
    @apply pt-1 text-sm font-medium text-gray-700
  }

  fieldset.classic {
    @apply flex gap-x-3
  }

  fieldset.classic input {
    @apply w-4 h-4 mr-2 disabled:bg-gray-100
  }

  fieldset.classic input:disabled ~ label {
    @apply text-gray-400
  }

  fieldset:not(.classic) input {
    @apply text-transparent border-0 focus:ring-0 w-0 h-0
  }

  fieldset:not(.classic) label {
    @apply w-full h-full
    border border-gray-300
    bg-white rounded-md shadow-sm
    sm:text-sm focus:outline-none
    hover:bg-gray-200
    focus:ring-primary-500 focus:ring-1 focus:border-primary-500
    disabled:bg-gray-100
  }

  fieldset:not(.classic) input:checked ~ label {
    @apply bg-primary-300 text-white
  }
  legend {
    white-space: nowrap;
  }
</style>
