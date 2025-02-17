<script lang="ts">
  import icons from './icons'
  import './Icons.css'

  export let name: string
  export let size: 'xs' | 'sm' | '' | 'lg' = ''
  export let strokeWidth: string = '2'
</script>

{@html icons[name]?.replace('<svg', `<svg class="icon shrink-0 ${name} ${size} ${$$props.class }" stroke-width=${strokeWidth} focusable="false"`) ?? 'NO-ICON-' + name}
