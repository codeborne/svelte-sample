<script lang="ts">
  import SortableTable from 'src/components/SortableTable.svelte'
  import type {Address} from 'src/api/types'
  import Sample from 'src/samples/Sample.svelte'

  let addresses = [
    {county: 'Harjumaa', municipality: 'Tallinn', street: 'Sepise', building: '8'},
    {county: 'Saaremaa', municipality: 'Leisi', street: 'Soodi', building: '3'},
  ] as Address[]
</script>

<Sample>
  <SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={addresses} let:item={a}>
    <tr>
      <td>{a.county}</td>
      <td>{a.municipality}</td>
      <td>{a.street}</td>
      <td>{a.building}</td>
    </tr>
  </SortableTable>
</Sample>

<Sample title="Empty state">
  <SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={[]}/>
</Sample>

<Sample title="Loading state">
  <SortableTable labels="addresses" columns={['county', 'municipality', 'street', 'building']} items={undefined}/>
</Sample>
