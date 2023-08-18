<script lang="ts">
  import {_, path} from 'src/i18n'

  export let to: string
  export let target: string|undefined = undefined
  export let label = ''
</script>

<a href={path(to)} {target} {...$$restProps} class={$$props.class ?? 'text-link'}>
  <slot/>
  <span>{_(label)}</span>
</a><slot name="suffix"/>
