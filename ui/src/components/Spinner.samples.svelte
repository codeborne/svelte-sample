<script lang="ts">
  import Spinner from 'src/components/Spinner.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Usage"
               description="A simple loading spinner component to indicate loading states.">
</SampleSection>

<SampleSection title="Customization"
               description="Could be customized by passing in size, stroke width and stroke color">
  <Spinner/>
  <Spinner size="32"/>
  <Spinner size="32" stroke="3"/>
  <Spinner size="32" stroke="6" color="stroke-primary"/>
</SampleSection>
