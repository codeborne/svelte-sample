<script>
  import CheckboxField from 'src/forms/CheckboxField.svelte'
  import ExampleClarityCard from 'src/slides/ui-animations/ExampleClarityCard.svelte'
  import ExampleClarityCardList from 'src/slides/ui-animations/ExampleClarityCardList.svelte'

  let glossary = [
    {term: 'Intrinsic cognitive load', definition: 'The inherent difficulty of a task.'},
    {term: 'Extraneous cognitive load', definition: 'Unnecessary cognitive load added by the user interface'},
    {
      term: 'Germane cognitive load',
      definition: 'The mental effort that helps users learn and use the system efficiently.'
    },
  ]

  let animationsEnabled = false

</script>

<div class="py-6">
  <CheckboxField bind:checked={animationsEnabled} renderAsToggle label="Enable animations"/>
</div>

<ExampleClarityCardList>
  {#each glossary as {term, definition}}
    <ExampleClarityCard {animationsEnabled} title={term} collapsible collapse>
      {definition}
    </ExampleClarityCard>
  {/each}
</ExampleClarityCardList>

<div class="py-6">
  <mark>[Todo: better example with invoices / more complex data]</mark>
</div>
