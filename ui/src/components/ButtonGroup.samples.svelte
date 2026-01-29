<script lang="ts">
  import ButtonGroup from "./ButtonGroup.svelte";
  import Button from "./Button.svelte";

  const sizes = ["xs", "sm", "", "lg"] as const;

  let selectedOption = 0;
</script>

<div class="grid justify-items-start gap-3">
  {#each sizes as size}
    <ButtonGroup>
      {#each Array(3) as item, i}
        <Button
          color="primary"
          variant={selectedOption === i ? "solid" : "outlined"}
          {size}
          onclick={() => (selectedOption = i)}
        >
          Primary {size.toUpperCase()}
        </Button>
      {/each}
    </ButtonGroup>
  {/each}

  <h5>With icon buttons</h5>

  <ButtonGroup>
    {#each Array(3) as item, i}
      <Button
        color="primary"
        class="flex-col"
        icon="info-circle"
        variant={selectedOption === i ? "solid" : "outlined"}
        size="xs"
        onclick={() => (selectedOption = i)}
      >
        Columned icon
      </Button>
    {/each}
  </ButtonGroup>

  <ButtonGroup>
    {#each Array(3) as item, i}
      <Button
        color="primary"
        class="flex-col"
        icon="info-circle"
        variant={selectedOption === i ? "solid" : "outlined"}
        size="sm"
        onclick={() => (selectedOption = i)}
      >
        Columned icon
      </Button>
    {/each}
  </ButtonGroup>
</div>
