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

<h4>Empty state</h4>
<SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={[]}/>

<h4>Loading state</h4>
<SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={undefined}/>
