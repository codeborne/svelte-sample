<script lang="ts">
  import SortableTable from 'src/components/SortableTable.svelte'
  import type {Address} from 'src/api/types'
  import {t} from 'src/i18n'

  let addresses = [
    {county: 'Harjumaa', municipality: 'Tallinn', street: 'Sepise', building: '8'},
    {county: 'Saaremaa', municipality: 'Leisi', street: 'Soodi', building: '3'},
  ] as Address[]
</script>

<SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={addresses} let:item={a}>
  <tr>
    <td>{a.county}</td>
    <td>{a.municipality}</td>
    <td>{a.street}</td>
    <td>{a.building}</td>
  </tr>
</SortableTable>

<h4>Empty state</h4>
<SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={[]}/>

<h4>Loading state</h4>
<SortableTable labels={t.addresses} columns={['county', 'municipality', 'street', 'building']} items={undefined}/>
