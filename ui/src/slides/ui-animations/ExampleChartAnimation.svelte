<script>
  import Tabs from 'src/components/Tabs.svelte'
  import CheckboxField from 'src/forms/CheckboxField.svelte'

  export let animationsEnabled = false

  export let tabComponents = ['2023', '2024']
  export let selectedTab = tabComponents[0]

  let chartData = [
    { "month": "Jan", "coffee_2023": 45, "coffee_2024": 43, "productivity_2023": 62, "productivity_2024": 64 },
    { "month": "Feb", "coffee_2023": 42, "coffee_2024": 44, "productivity_2023": 60, "productivity_2024": 58 },
    { "month": "Mar", "coffee_2023": 50, "coffee_2024": 52, "productivity_2023": 72, "productivity_2024": 71 },
    { "month": "Apr", "coffee_2023": 49, "coffee_2024": 48, "productivity_2023": 70, "productivity_2024": 68 },
    { "month": "May", "coffee_2023": 54, "coffee_2024": 55, "productivity_2023": 74, "productivity_2024": 73 },
    { "month": "Jun", "coffee_2023": 52, "coffee_2024": 50, "productivity_2023": 75, "productivity_2024": 76 },
    { "month": "Jul", "coffee_2023": 30, "coffee_2024": 32, "productivity_2023": 42, "productivity_2024": 40 },
    { "month": "Aug", "coffee_2023": 27, "coffee_2024": 25, "productivity_2023": 38, "productivity_2024": 37 },
    { "month": "Sep", "coffee_2023": 52, "coffee_2024": 50, "productivity_2023": 74, "productivity_2024": 72 },
    { "month": "Oct", "coffee_2023": 54, "coffee_2024": 53, "productivity_2023": 77, "productivity_2024": 75 },
    { "month": "Nov", "coffee_2023": 46, "coffee_2024": 48, "productivity_2023": 67, "productivity_2024": 66 },
    { "month": "Dec", "coffee_2023": 33, "coffee_2024": 41, "productivity_2023": 57, "productivity_2024": 56 }
  ]
</script>
<div class="absolute inset-[5cqi] flex flex-col justify-between">
  <div>
    <CheckboxField bind:checked={animationsEnabled} renderAsToggle label="Enable animations"/>
  </div>

  <div class="font-semibold">Avg. Coffee Consumption per Employee</div>

  <Tabs items={tabComponents} bind:activeTab={selectedTab} let:item />


  <div class="flex justify-between items-end gap-1 w-full flex-grow">
    {#each chartData as data}
      <div class="col-span-1 h-full flex flex-col justify-end">
      <div class=" bg-orange-900 rounded-t-xs w-full text-white text-xs p-1 {animationsEnabled ? 'transition-all duration-700' : ''}" style="height: {data['coffee_' + selectedTab]}%">
        {data['coffee_' + selectedTab]}
      </div>
      <div class="text-[1.5cqi] text-center">{data.month}</div>
      </div>
    {/each}
  </div>
</div>

