<script lang="ts">
  import PhoneField from 'src/forms/PhoneField.svelte'
  import {CountryCode} from 'src/api/types'
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Examples">
  <div class="w-64 common-grid">
    <PhoneField label="With known country" countryCode={CountryCode.EE}/>
    <PhoneField label="With unknown country"/>
  </div>
</SampleSection>
