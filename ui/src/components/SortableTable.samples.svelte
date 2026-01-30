<script lang="ts">
  import SortableTable from 'src/components/SortableTable.svelte'
  import type {Address} from 'src/api/types'
  import {t} from 'src/i18n'
  import SampleSection from 'src/layout/SampleSection.svelte'

  let addresses = [
    {county: 'Harjumaa', municipality: 'Tallinn', street: 'Sepise', building: '8'},
    {county: 'Saaremaa', municipality: 'Leisi', street: 'Soodi', building: '3'},
  ] as Address[]
</script>

<SampleSection title="Default">
  <SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={addresses} let:item={a}>
    <tr>
      <td>{a.county}</td>
      <td>{a.municipality}</td>
      <td>{a.street}</td>
      <td>{a.building}</td>
    </tr>
  </SortableTable>
</SampleSection>

<SampleSection title="Empty state">
  <SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={[]}/>
</SampleSection>

<SampleSection title="Loading state">
  <SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={undefined}/>
</SampleSection>
