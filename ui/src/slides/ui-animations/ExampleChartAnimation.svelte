<script>
  import Tabs from 'src/components/Tabs.svelte'

  export let tabComponents = ['2023', '2024']
  export let selectedTab = tabComponents[0]

  let chartData = [
    {'month': 'Jan', 'coffee_2023': 45, 'coffee_2024': 50, 'productivity_2023': 60, 'productivity_2024': 65},
    {'month': 'Feb', 'coffee_2023': 40, 'coffee_2024': 44, 'productivity_2023': 58, 'productivity_2024': 63},
    {'month': 'Mar', 'coffee_2023': 50, 'coffee_2024': 55, 'productivity_2023': 70, 'productivity_2024': 78},
    {'month': 'Apr', 'coffee_2023': 48, 'coffee_2024': 52, 'productivity_2023': 68, 'productivity_2024': 75},
    {'month': 'May', 'coffee_2023': 55, 'coffee_2024': 60, 'productivity_2023': 72, 'productivity_2024': 80},
    {'month': 'Jun', 'coffee_2023': 52, 'coffee_2024': 58, 'productivity_2023': 74, 'productivity_2024': 83},
    {'month': 'Jul', 'coffee_2023': 30, 'coffee_2024': 35, 'productivity_2023': 40, 'productivity_2024': 45},
    {'month': 'Aug', 'coffee_2023': 25, 'coffee_2024': 28, 'productivity_2023': 35, 'productivity_2024': 40},
    {'month': 'Sep', 'coffee_2023': 50, 'coffee_2024': 55, 'productivity_2023': 72, 'productivity_2024': 78},
    {'month': 'Oct', 'coffee_2023': 53, 'coffee_2024': 58, 'productivity_2023': 75, 'productivity_2024': 82},
    {'month': 'Nov', 'coffee_2023': 45, 'coffee_2024': 50, 'productivity_2023': 65, 'productivity_2024': 72},
    {'month': 'Dec', 'coffee_2023': 38, 'coffee_2024': 42, 'productivity_2023': 55, 'productivity_2024': 60}
  ]
</script>
<div class="absolute top-[5cqi] bottom-0 left-[5cqi] right-[5cqi] flex flex-col justify-between">
  <div>
    Toggle
  </div>

  <div class="font-semibold">Coffee Consumption per employee</div>

  <Tabs items={tabComponents} bind:activeTab={selectedTab} let:item />


  <div class="flex justify-between items-end gap-1 w-full flex-grow">
    {#each chartData as data}
      <div class="col-span-1 bg-orange-900 rounded-t-xs w-full text-white text-xs p-1" style="height: {data['coffee_' + selectedTab]}%">
        {data['coffee_' + selectedTab]}
      </div>
    {/each}
  </div>
</div>

