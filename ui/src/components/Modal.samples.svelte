<script>
  import Modal from 'src/components/Modal.svelte'
  import UserForm from 'src/samples/UserForm.svelte'
  import Button from 'src/components/Button.svelte'

  let showNormal = false, showWide = false
</script>

<Button label="Show Normal Modal" onclick={() => showNormal = true}/>
<Button label="Show Wide Modal" onclick={() => showWide = true}/>

<Modal title="Normal Modal" bind:show={showNormal}>
  <UserForm/>
</Modal>

<Modal title="Wide Modal" bind:show={showWide} wide>
  <UserForm/>
</Modal>
