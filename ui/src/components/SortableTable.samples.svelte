<script lang="ts">
  import SortableTable from 'src/components/SortableTable.svelte'
  import type {Address} from 'src/api/types'

  let addresses = [
    {county: 'Harjumaa', municipality: 'Tallinn', street: 'Sepise', building: '8'},
    {county: 'Saaremaa', municipality: 'Leisi', street: 'Soodi', building: '3'},
  ] as Address[]
</script>

<SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={addresses} let:item={a}>
  <tr>
    <td>{a.county}</td>
    <td>{a.municipality}</td>
    <td>{a.street}</td>
    <td>{a.building}</td>
  </tr>
</SortableTable>

<h2>Empty state</h2>
<SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={[]}/>

<h2>Loading state</h2>
<SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={undefined}/>
