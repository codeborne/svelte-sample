<script lang="ts">
  import RadioButton from 'src/forms/RadioButton.svelte'
  import type {RadioOption} from 'src/forms/RadioButton'
  import bankData from 'i18n/banks.json'

  let currency: RadioOption | undefined
  let country: RadioOption | undefined
  let bank: RadioOption | undefined
  let imageSize: RadioOption | undefined

  let sizes = ['sm', 'md', 'lg'].map(value => ({value}))

  let currencies: RadioOption[] = [
    {label: 'Polish zloty', value: 'PLN'},
    {label: 'Euro', value: 'EUR'}
  ]

  interface BankData {
    supportedCurrencies: string[],
    paymentMethods: BankDetails[]
  }

  interface BankDetails {
    code: string,
    name: string,
    logoUrl: string,
    supportedCurrencies: string[]
  }

  let banksByCountry: Record<string, BankData> = bankData
  $: countries = Object.entries(banksByCountry)
    .filter(([k, v]) => currency && v.supportedCurrencies.includes(currency.value))
    .map(([k, v]) => ({value: k}))

  $: banks = country ? banksByCountry[country.value].paymentMethods
    .filter(b => currency && b.supportedCurrencies.includes(currency.value))
    .map((b) => ({
      label: b.name,
      value: b.code.toString(),
      data: b
    })) : [] as RadioOption[]
</script>


<RadioButton bind:value={currency}
             class="classic flex-col gap-1"
             label="Please select Currency:"
             name="currencies"
             options={currencies}/>

{#if countries?.length}
  <RadioButton bind:value={country}
               class="classic"
               label="Please select your Country:"
               name="countries"
               options={countries}/>

{/if}
{#if banks?.length}
  <RadioButton bind:value={bank}
               class="gap-2 grid grid-cols-8"
               label="Please select your bank:"
               name="banks"
               options={banks} let:option>
    <div class="h-10 flex items-center">
      <img src={option.data.logoUrl} class="h-full w-full object-contain p-1" alt={option.label}/>
    </div>
  </RadioButton>

  <div>Selected bank is: {bank?.label || ''} {bank?.value || ''}</div>
{/if}
