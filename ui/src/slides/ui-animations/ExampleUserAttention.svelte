<script>
  import Alert from 'src/components/Alert.svelte'
  import FormField from 'src/forms/FormField.svelte'
  import Button from 'src/components/Button.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'

  let username = 'codeborne'
  let password = 'codeborne'
  let form
  let animationsEnabled = false

  let showError = true

  function handleSubmit(e) {
    e.preventDefault()
    showError = false
    setTimeout(() => {
      showError = true
    }, 0)
  }
</script>

<CheckboxField bind:checked={animationsEnabled} renderAsToggle label="Enable animations"/>

<form class="mt-6 space-y-6" action="#" method="POST" on:submit={handleSubmit} bind:this={form}>
  {#if showError}
    <div class="{animationsEnabled ? 'shake' : ''}">
      <Alert color="warning">Incorrect username or password</Alert>
    </div>
  {/if}

  <FormField autocomplete="username"
             insetLabel
             id="username"
             label="Username"
             bind:value={username}
             autofocus
  />
  <FormField
    type="password"
    id="password"
    autocomplete="current-password"
    insetLabel
    label="Password"
    bind:value={password}
  />

  <div>
    <Button type="submit"
            class="primary lg w-full"
    >
      Login
    </Button>
  </div>

</form>

<style lang="postcss">
  .shake {
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
