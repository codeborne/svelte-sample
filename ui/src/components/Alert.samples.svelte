<script lang="ts">
  import Alert from './Alert.svelte'
  import SampleSection from 'src/components/SampleSection.svelte'

  const sizes = ['', 'sm', 'lg'] as const
</script>

<SampleSection title="Usage"
               description="Use the Alert component to display important messages, notifications, or feedback to users that requires attention.">
  <h4 class="text-xs uppercase">Common use cases</h4>
  <ul class="list-disc pl-5 space-y-2">
    <li>
      <div><strong>Form-level errors</strong></div>
      <div class="mb-1">
        Display errors that cannot be tied to a single field (for those it is better to use an error message directly near the field)
      </div>
      <Alert color="danger">Failed to load user data</Alert>
    </li>
    <li>
      <div><strong>Warnings and errors</strong></div>
      <div class="mb-1">
        Alert users about issues that need attention
      </div>
      <Alert color="warning">Last update 1 hour ago</Alert>
    </li>
    <li>
      <div><strong>Success confirmations</strong></div>
      <div class="mb-1">
        Provide positive feedback after successful operations
      </div>
      <Alert color="success">Updated successfully</Alert>
    </li>
  </ul>


</SampleSection>

<SampleSection title="Sizes">
  <div class="space-y-6">
    {#each sizes as size}
      <div class="flex flex-col gap-4">
        <h4 class="text-xs uppercase">Size {size || "default"}</h4>
        <Alert {size}>Default</Alert>
        <Alert {size} color="primary">Primary</Alert>
        <Alert {size} color="success">Success</Alert>
        <Alert {size} color="warning">Warning</Alert>
        <Alert {size} color="danger">Danger</Alert>
      </div>
    {/each}
  </div>
</SampleSection>
