<script lang="ts">
  import Tabs from 'src/components/Tabs.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  let activeTab = $state('Profile')
</script>

<SampleSection title="Default usage"
               description="Tabs allow users to navigate between different views within the same context.">
  <Tabs items={['Profile', 'Settings', 'Notifications', 'Privacy']} bind:activeTab/>

  <div class="mt-4 p-4 bg-gray-50 rounded">
    <p class="text-sm text-gray-600">Active tab: <strong>{activeTab}</strong></p>
  </div>
</SampleSection>

<SampleSection title="Aligned to left">
  <Tabs items={['Profile', 'Settings', 'Notifications', 'Privacy']} class="justify-self-start" bind:activeTab/>
</SampleSection>

<SampleSection title="Few tabs">
  <Tabs items={['Overview', 'Details']}/>
</SampleSection>

<SampleSection title="Many tabs">
  <Tabs items={['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6', 'Tab 7']}/>
</SampleSection>

