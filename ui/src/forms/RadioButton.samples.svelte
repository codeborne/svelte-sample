<script lang="ts">
  import RadioButton from 'src/forms/RadioButton.svelte'
  import type {RadioImageSize, RadioOption} from 'src/forms/RadioButton'
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

  interface BankData {supportedCurrencies: string[], paymentMethods: BankDetails[]}
  interface BankDetails {code: string, name: string, logoUrl: string, supportedCurrencies: string[]}

  let banksByCountry: Record<string, BankData> = bankData
  $: countries = Object.entries(banksByCountry)
    .filter(([k, v]) => currency && v.supportedCurrencies.includes(currency.value))
    .map(([k, v]) => ({value: k}))

  $: banks = country ? banksByCountry[country.value].paymentMethods
    .filter(b => currency && b.supportedCurrencies.includes(currency.value))
    .map((b) => ({
      label: b.name,
      value: b.code.toString(),
      src: b.logoUrl
    })) : [] as RadioOption[]

  $: size = (imageSize?.value ?? '') as RadioImageSize
</script>


<RadioButton bind:value={currency} class="classic flex-col gap-1" label="Please select Currency:" name="currencies" options={currencies}/>

{#if countries?.length}
  <RadioButton bind:value={country}
               class="classic"
               label="Please select your Country:"
               name="countries" options={countries}/>

{/if}
{#if banks?.length}
  <RadioButton bind:value={imageSize} label="Size" name="size" options={sizes} class="classic"/>
  <RadioButton bind:value={bank}
               class="gap-2 grid grid-cols-6"
               label="Please select your bank:"
               name="banks"
               {size}
               options={banks}/>

  <div>Selected bank is: {bank?.label || ''} {bank?.value || ''}</div>
{/if}
