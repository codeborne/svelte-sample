<script lang="ts">
  import SelectField from './SelectField.svelte'
  import {lang} from '../i18n'

  export let month: number|string = new Date().getMonth()
  export let from = ''
  export let until = ''
  export let wholeOption = ''

  const format = new Intl.DateTimeFormat(lang, {month: 'long'}).format
  export let months = [...Array(12).keys()].indexBy(m => m, m => format(new Date(2021, m)))
  if (wholeOption) months['whole'] = wholeOption

  function setMonth(m: string) {
    let date = new Date()
    date.setMonth(m == 'whole' ? 0 : +m)
    date.setDate(1)
    from = date.toLocaleDateString('lt')
    date.setMonth(m == 'whole' ? 12 : +m + 1)
    date.setDate(0)
    until = date.toLocaleDateString('lt')
  }
</script>

<SelectField options={months} bind:value={month} on:change={e => setMonth(e.currentTarget?.['value'])} {...$$restProps}/>
