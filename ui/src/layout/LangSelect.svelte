<script lang="ts">
  import {lang, langs, rememberLang} from 'src/i18n'
  import SelectField from 'src/forms/SelectField.svelte'

  export let location = window.location

  async function onchange(e: FormEvent) {
    const newLang = e.currentTarget.value
    rememberLang(newLang)
    location.href = location.pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${newLang}$1`)
  }
</script>

<SelectField class="lang {$$props.class }" value={lang} options={langs.indexBy(l => l, l => l)} {onchange}/>
