<script lang="ts">
  import FormField from './FormField.svelte'

  export let label: string | undefined = undefined
  export let value: string | number = ''
  export let unit = ''
  export let min = 0
  export let maxlength = 10

  interface $$Events {input: FormEvent; change: FormEvent}
</script>

<FormField {label} type="number" {min} {maxlength} bind:value style="padding-right: {unit.length / 2 + 1.5}em" on:input on:change {...$$restProps}>
  <div slot="after" class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <span class="unit text-gray-500 sm:text-sm">{unit}</span>
  </div>
</FormField>
