<script lang="ts">
  import {replaceValues, t} from 'src/i18n'
  import type {User} from 'src/api/types'
  import Form from 'src/forms/Form.svelte'
  import Button from 'src/components/Button.svelte'
  import api from 'src/api/api'
  import {showToast} from 'src/stores/toasts'
  import FormField from 'src/forms/FormField.svelte'
  import PhoneField from 'src/forms/PhoneField.svelte'
  import RadioButton from 'src/forms/RadioButton.svelte'

  export let user: User = {} as User
  export let savePath = 'users'
  export let onsaved = (user: User) => {}

  let gender: keyof typeof t.gender | undefined

  async function submit() {
    user = await api.post(savePath, user)
    showToast(replaceValues(t.general.saved, user))
    onsaved(user)
  }
</script>

<Form {submit}>
  <div class="common-grid sm:grid-cols-2">
    <FormField label={t.person.firstName} bind:value={user.firstName} autofocus={!!user.id}/>
    <FormField label={t.person.lastName} bind:value={user.lastName}/>
    <FormField label={t.contacts.email} type="email" bind:value={user.email}/>
    <PhoneField label={t.contacts.phone} bind:value={user.phone} required={false}/>
    <FormField label={t.person.personalCode} type="tel" bind:value={user.personalCode} required={false} minlength={11} maxlength={11} pattern="[0-6]\d\d[01]\d[0-3]\d\d\d\d\d"/>
    <RadioButton bind:value={gender} class="classic" label={t.person.gender} options={t.gender}/>
  </div>

  <div class="flex justify-end">
    <Button type="submit" label={t.general.save} class="primary"/>
  </div>
</Form>
