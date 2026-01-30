<script lang="ts">
  import RadioButton from 'src/forms/RadioButton.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const currencies = {
    PLN: 'Polish zloty',
    EUR: 'Euro',
    SEK: 'Swedish krona'
  }

  let currency: keyof typeof currencies
</script>

<SampleSection title="Examples">
  <RadioButton bind:value={currency}
               class="classic flex-col gap-1"
               label="Please select Currency:"
               name="currencies"
               options={currencies}/>
</SampleSection>
