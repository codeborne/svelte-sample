<script lang="ts">
  import PhoneField from 'src/forms/PhoneField.svelte'
  import {CountryCode} from 'src/api/types'
</script>

<div class="w-64 common-grid">
  <PhoneField label="With known country" countryCode={CountryCode.EE}/>
  <PhoneField label="With unknown country"/>
</div>
