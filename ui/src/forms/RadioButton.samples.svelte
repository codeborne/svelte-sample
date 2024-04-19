<script lang="ts">
  import RadioButton from 'src/forms/RadioButton.svelte'

  const currencies = {
    PLN: 'Polish zloty',
    EUR: 'Euro',
    SEK: 'Swedish krona'
  }

  let currency: keyof typeof currencies
</script>

<RadioButton bind:value={currency}
             class="classic flex-col gap-1"
             label="Please select Currency:"
             name="currencies"
             options={currencies}/>
