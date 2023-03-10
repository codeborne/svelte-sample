<script lang="ts">
  import {_} from 'src/i18n'
  import Spinner from 'src/components/Spinner.svelte'

  type T = $$Generic
  type Field = keyof T | ((item: T) => any) | false | '' | undefined

  export let id: string|undefined = undefined
  export let items: T[]|undefined
  export let labels: string = ''
  export let columns: (string|false|undefined)[]
  export let sortFields: Field[] = columns as Field[]
  export let rightAlign: string[] = ['amount', 'amountWithVAT']
  export let sortedBy: Field = undefined, asc = 1

  if (columns.length != sortFields.length) throw Error('columns and fields must be of the same length')

  function get(item: T, by: Field) {
    const v = by instanceof Function ? by(item) : by && item[by]
    return v?.toLowerCase ? v.toLowerCase() : v ?? ''
  }

  function sortBy(array: T[], by: Field) {
    if (sortedBy === by) asc = -asc; else asc = 1
    sortedBy = by
    return array.sort((a, b) => {
      const bya = get(a, by), byb = get(b, by)
      if (bya === byb) return 0
      else if (bya > byb) return asc
      else return -asc
    })
  }

  let itemsToRender: T[]
  $: if (items) {
    itemsToRender = items.slice(0, 20)
    renderMore()
  }

  function renderMore() {
    if (itemsToRender!.length < items!.length)
      setTimeout(() => itemsToRender = items!, 100)
  }
</script>

<div class="-mx-6 overflow-x-auto md:mx-0 md:overflow-visible {$$props.class ?? ''}">
  <div class="min-w-full pb-3">
    <table {id} class="min-w-full bg-white divide-y divide-gray-200 border-b border-gray-200 md:rounded-lg md:shadow">
      <thead class="border-b-2">
        <tr>
          {#each columns as column, i}
            {#if column || column === ''}
              <th on:click={() => items = items && !!column ? sortBy(items, sortFields[i]) : items}
                  scope="col"
                  class="text-xs font-medium text-muted uppercase tracking-wider relative {asc === 1 ? 'asc' : 'desc'} {rightAlign.includes(column) ? 'text-right' : ''}"
                  class:sortable={!!column}
                  class:sorted={sortedBy === sortFields[i]}>
                {#if column}
                  <span class="pr-1">{_((labels && !column.includes('.') ? labels + '.' : '') + column)}</span>
                {/if}
              </th>
            {/if}
          {/each}
        </tr>
        {#if items}
          <slot name="thead"/>
        {/if}
      </thead>
      <tbody class="divide-y divide-gray-200">
      {#if items}
        {#if !items.length}
          <tr>
            <td colspan={columns.length} class="text-center">{_('general.noItems')}</td>
          </tr>
        {:else}
          {#each itemsToRender as item, i (item['id'] ?? i)}
            <slot {item} {i}/>
          {/each}
        {/if}
      {:else}
        <tr>
          <td colspan={columns.length} class="text-center"><Spinner/></td>
        </tr>
      {/if}
      </tbody>
      {#if items}
        <slot name="tfoot"/>
      {/if}
    </table>
  </div>
</div>

<style>
  table :global(th), table :global(td) {
    @apply px-4 py-3;
  }

  table :global(th:last-child), :global(td:last-child:not(:first-child)) {
    text-align: right;
  }

  th.sortable {
    cursor: pointer;
  }

  th.sorted::after {
    @apply border-gray-500;
    position: absolute;
    content: '';
    transform: translateY(-50%);
    top: 1.7em;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  th.sorted.asc::after {
    border-bottom: 5px solid;
  }

  th.sorted.desc::after {
    border-top: 5px solid;
  }
</style>
