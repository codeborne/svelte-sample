<script>
  import Dropdown from 'src/components/Dropdown.svelte'
  import Button from 'src/components/Button.svelte'
</script>

<div class="flex justify-between">
  <Dropdown>
    <Button>
      Sample dropdown
    </Button>
    {#snippet menu()}
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    {/snippet}
  </Dropdown>
  <Dropdown class="right-0">
    <Button>
      Right-aligned dropdown
    </Button>
    {#snippet menu()}
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    {/snippet}
  </Dropdown>
</div>
