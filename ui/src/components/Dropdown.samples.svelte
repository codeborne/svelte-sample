<script>
  import Dropdown from 'src/components/Dropdown.svelte'
  import Button from 'src/components/Button.svelte'
</script>

<div class="flex justify-between">
  <Dropdown>
    <Button>
      Sample dropdown
    </Button>
    <svelte:fragment slot="open">
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    </svelte:fragment>
  </Dropdown>
  <Dropdown class="right-0">
    <Button>
      Right-aligned dropdown
    </Button>
    <svelte:fragment slot="open">
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    </svelte:fragment>
  </Dropdown>
</div>
