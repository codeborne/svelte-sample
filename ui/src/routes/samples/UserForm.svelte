<script lang="ts">
  import {_} from 'src/i18n'
  import {createEventDispatcher} from 'svelte'
  import type {User} from 'src/api/types'
  import Form from 'src/forms/Form.svelte'
  import Button from 'src/components/Button.svelte'
  import api from 'src/api/api'
  import {showToast} from 'src/stores/toasts'
  import FormField from 'src/forms/FormField.svelte'
  import PhoneField from 'src/forms/PhoneField.svelte'
  import RadioButton from 'src/forms/RadioButton.svelte'
  import {objectToOptions} from 'src/forms/RadioButton'
  import type {RadioOption} from 'src/forms/RadioButton'

  export let user: User = {} as User
  export let savePath = 'users'
  let gender: RadioOption | undefined

  const dispatch = createEventDispatcher<{saved: User}>()

  async function submit() {
    user = await api.post(savePath, user)
    showToast(_('general.saved', user))
    dispatch('saved', user)
  }
</script>

<Form {submit}>
  <div class="common-grid sm:grid-cols-2">
    <FormField label="person.firstName" bind:value={user.firstName} autofocus={!!user.id}/>
    <FormField label="person.lastName" bind:value={user.lastName}/>
    <FormField label="contacts.email" type="email" bind:value={user.email}/>
    <PhoneField label="contacts.phone" bind:value={user.phone} required={false}/>
    <FormField label="person.personalCode" type="tel" bind:value={user.personalCode} required={false} minlength={11} maxlength={11} pattern="[0-6]\d\d[01]\d[0-3]\d\d\d\d\d"/>
    <RadioButton bind:value={gender} class="classic" label="person.gender" options={objectToOptions(_('gender'))}/>
  </div>

  <div class="flex justify-end">
    <Button type="submit" label="general.save" class="primary"/>
  </div>
</Form>
