<script>
  import {Link} from 'svelte-navigator'
  import Button from 'src/components/Button.svelte'
  import {mockEmailNotifications} from 'src/prototyping/emails/mockEmails'

  function showMockEmailSending() {
    mockEmailNotifications.showMockEmailNotification('password-reset')
  }
</script>

<div class="space-y-3">
  <h3>E-mail client</h3>
  <p>There is a separate page for mocking an e-mail client. This can be used to convey the ideas revolving around e-mails, their visuals and their content.</p>
  <Link to="/emails" class="btn secondary solid">Go to mock emails</Link>

  <hr class="!my-8"/>

  <h3>Mock e-mail notification</h3>
  <p>To reflect the idea that for some action an e-mail is sent we can mimic the email sending by showing a system notification that an e-mail was received by the user.</p>
  <Button on:click={() => showMockEmailSending()}>Show a mock email notification</Button>
</div>
