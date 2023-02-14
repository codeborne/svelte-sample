<script lang="ts">
  import {lang, langs, rememberLang} from 'src/i18n'
  import SelectField from 'src/forms/SelectField.svelte'
  import {user} from 'src/stores/auth'
  import api from 'src/api/api'

  export let location = window.location

  async function onChange(e: FormEvent) {
    const newLang = e.currentTarget.value
    rememberLang(newLang)
    if ($user) await updateUserLocale(newLang)
    location.href = location.pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${newLang}$1`)
  }

  async function updateUserLocale(lang: string) {
    $user.lang = lang
    await api.post(`users/lang`, {lang})
  }
</script>

<SelectField class="lang {$$props.class ?? ''}" value={lang} options={langs.indexBy(l => l, l => l)} on:change={onChange}/>
