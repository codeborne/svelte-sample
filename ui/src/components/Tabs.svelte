<script lang="ts">

  export let items: string[] = []
  export let activeTab = items[0]
</script>

<div class="border-b border-gray-200 mb-8">
  <nav class="-mb-px flex justify-end items-center space-x-8" aria-label="Tabs">
    {#each items as item}
      <a on:click={() => activeTab = item}
         class:border-primary-500={activeTab === item}
         class:border-transparent={activeTab !== item}
         class="flex-1 text-gray-500 text-center hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
        {item}
      </a>
    {/each}
  </nav>
</div>







