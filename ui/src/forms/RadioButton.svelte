<script lang="ts">
  import type {RadioOption} from 'src/forms/RadioButton'
  import {_} from '@codeborne/i18n-json'

  export let label: string
  export let value: RadioOption | undefined
  export let required = true
  export let options: RadioOption[]
  export let id = Math.floor(Math.random() * 100).toString()

  $: resetOption(options)

  function resetOption(o: RadioOption[] | undefined) {
    if (!o || value && !o.includes(value)) value = undefined
  }

  function deselect(option: RadioOption) {
    if (value === option) value = undefined
  }

  const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
</script>

<fieldset {...$$restProps} class="{$$props.class}" id={`group-${id}`} role="radiogroup">
  <legend id={`label-${id}`} class="w-full">{_(label)}</legend>
  {#each options as option}
    <div class="flex items-center">
      <input id={id + slugify(option.value)}
             {required}
             name={`radio-${id}`}
             on:click={()=> deselect(option)}
             type="radio"
             value={option}
             bind:group={value}/>
      <label for={id + slugify(option.value)}>
        <slot option={option}>
          {_(option.label ?? option.value)}
        </slot>
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
