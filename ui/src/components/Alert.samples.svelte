<script lang="ts">
  import Alert from "./Alert.svelte";

  const sizes = ["", "sm", "lg"] as const;
</script>

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
