<script lang="ts">
  import FormField from './FormField.svelte'

  export let label: string | undefined = undefined
  export let value: string | number = ''
  export let unit = ''
  export let required = true

  interface $$Events {input: FormEvent; change: FormEvent}

  if ($$props.maxlength == undefined) $$props.maxlength = 10
  if ($$props.min == undefined) $$props.min = 0
</script>

<FormField {label} {required} class={$$props.class} let:id>
  <div class="relative">
    <input {id} type="number" bind:value {required} {...$$props} on:input on:change style="padding-right: {unit.length / 2 + 1.5}em">
    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <span class="unit text-gray-500 sm:text-sm">{unit}</span>
    </div>
  </div>
</FormField>
