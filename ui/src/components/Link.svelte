<script lang="ts">
  import {navigate, path} from 'src/i18n'

  export let to: string
  export let target: string|undefined = undefined
  export let label = ''

  function clicked(e: Event) {
    if (target) return
    e.preventDefault()
    navigate(to)
  }
</script>

<a href={path(to)} onclick={clicked} {target} {...$$restProps} class={$$props.class ?? 'text-link'}>
  <slot/>
  <span>{label}</span>
</a><slot name="suffix"/>
