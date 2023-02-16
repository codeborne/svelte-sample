<script lang="ts">
  import Sample from 'src/samples/Sample.svelte'
  import Badge from 'src/components/Badge.svelte'
</script>

<Sample title="Badge">
  <div class="common-grid w-64 mx-auto">
    <Badge>Primary</Badge>
    <Badge class="success">Success</Badge>
    <Badge class="warning">Warning</Badge>
    <Badge class="danger">Danger</Badge>
  </div>
</Sample>
