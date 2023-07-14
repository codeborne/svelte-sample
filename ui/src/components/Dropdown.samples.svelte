<script>
  import Dropdown from 'src/components/Dropdown.svelte'
</script>

<div class="flex justify-between">
  <Dropdown>
    <a class="btn default">
      Sample dropdown
    </a>
    <svelte:fragment slot="open">
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    </svelte:fragment>
  </Dropdown>
  <Dropdown class="right-0">
    <a class="btn default">
      Right-aligned dropdown
    </a>
    <svelte:fragment slot="open">
      <div class="w-80 px-3 py-2">
        Dropdown content
      </div>
    </svelte:fragment>
  </Dropdown>
</div>
