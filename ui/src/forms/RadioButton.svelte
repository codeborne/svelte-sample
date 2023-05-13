<script lang="ts">
  import type {RadioImageSize, RadioOption} from 'src/forms/RadioButton'
  import {_} from '@codeborne/i18n-json'

  export let label: string
  export let value: RadioOption | undefined
  export let required = true
  export let options: RadioOption[]
  export let id = Math.floor(Math.random() * 100).toString()
  export let size: RadioImageSize = 'md'

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
  <legend id={`label-${id}`}>{_(label)}</legend>
  {#each options as option}
    <div class="flex items-center {size}">
      <input id={id + slugify(option.value)}
             {required}
             name={`radio-${id}`}
             on:click={()=> deselect(option)}
             type="radio"
             value={option}
             bind:group={value}/>
      <label for={id + slugify(option.value)}>
        {#if option.src}
          <img src={option.src} class="object-scale-down p-1 w-auto-0 {size}" alt={option.label ?? option.value}/>
        {:else}
          {_(option.label ?? option.value)}
        {/if}
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
    @apply w-4 h-4 mr-2
  }

  fieldset:not(.classic) input {
    @apply text-transparent border-0 focus:ring-0 w-0 h-0
  }

  fieldset:not(.classic) label {
    @apply flex w-full h-full justify-center items-center
    border border-gray-300
    bg-white rounded-md shadow-sm
    sm:text-sm focus:outline-none focus:ring-primary-500 focus:ring-1 focus:border-primary-500 disabled:bg-gray-100
  }

  img.sm {
    @apply max-h-6
  }

  img.md {
    @apply max-h-10
  }

  img.lg {
    @apply max-h-16
  }

  fieldset:not(.classic) div.sm {
    @apply h-6
  }

  fieldset:not(.classic) div.md {
    @apply h-10
  }

  fieldset:not(.classic) div.lg {
    @apply h-16
  }

  fieldset:not(.classic) input:checked ~ label {
    @apply bg-primary-300 text-white
  }
</style>
