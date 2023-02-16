<script lang="ts">
  import {_} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import UnitsField from 'src/forms/UnitsField.svelte'
  import AmountField from 'src/forms/AmountField.svelte'
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import TextAreaField from 'src/forms/TextAreaField.svelte'
  import SelectField from 'src/forms/SelectField.svelte'
  import MultipleSelect from 'src/forms/MultipleSelect.svelte'
  import Form from 'src/forms/Form.svelte'
  import type {Address} from 'src/api/types'

  let range = 33
</script>

<MainPageLayout title={_('title')}>
  <div class="common-grid">

    <h2>More advanced components</h2>
    <Form submit={() => alert('Nowhere to submit')}>
      <TextAreaField label="TextArea" rows={3} value="Here we have char counter"/>
      <div class="common-grid sm:grid-cols-2">
        <AmountField label="AmountField" value={123}/>
        <RangeSlider label="RangeSlider" min={10} max={40} bind:value={range}/>
        <UnitsField label="UnitsField" value={100} units={['€ excl. VAT', '€ incl. VAT']} unitRatio={1.2}/>
        <SelectField label="SelectField" options={{'1': 'a', '2': 'b', '5': 'c'}} emptyOption="Please select something"/>
        <MultipleSelect label="MultipleSelect" options={{'1': 'a', '2': 'b', '5': 'c'}} values={['1', '5']}/>
      </div>
    </Form>
  </div>
</MainPageLayout>
