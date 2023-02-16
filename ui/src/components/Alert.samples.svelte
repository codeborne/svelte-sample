<script lang="ts">
  import Sample from 'src/samples/Sample.svelte'
  import Alert from 'src/components/Alert.svelte'
</script>

<Sample title="Alert">
  <div class="common-grid">
    <Alert>Primary</Alert>
    <Alert class="success">Success</Alert>
    <Alert class="warning">Warning</Alert>
    <Alert class="danger">Danger</Alert>
  </div>
</Sample>
