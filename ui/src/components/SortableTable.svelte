<script lang="ts">
  import {_} from 'src/i18n'
  import Spinner from 'src/components/Spinner.svelte'
  import {debounce} from 'src/shared/debounce'

  type T = $$Generic
  type Field = keyof T | ((item: T) => any) | false | '' | undefined

  export let id: string|undefined = undefined
  export let items: T[]|undefined
  export let labels: string = ''
  export let columns: (string|false|undefined)[]
  export let sortFields: Field[] = columns as Field[]
  export let rightAlign: string[] = ['amount', 'amountWithVAT']
  export let sortedBy: Field = undefined, asc = 1
  export let renderMax = 100

  if (location.origin.includes('localhost') && columns.length != sortFields.length) throw Error('columns and fields must be of the same length')

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

  function onScroll() {
    if (!items || renderMax >= items.length) return
    const scrollMax = document.body.scrollHeight - window.innerHeight
    if (window.scrollY == scrollMax) {
      renderMax = items.length
      setTimeout(() => scrollTo(0, document.body.scrollHeight))
    }
    else if (window.scrollY > scrollMax - window.innerHeight) renderMax += 50
  }
</script>

<svelte:window on:scroll={debounce(onScroll, 300)}/>

<div class="-mx-6 overflow-x-auto md:mx-0 md:overflow-visible {$$props.class ?? ''}">
  <div class="min-w-full pb-3">
    <table {id}>
      <thead>
      <tr>
        {#each columns as column, i}
          {#if column || column === ''}
            <th on:click={() => items = items && !!column ? sortBy(items, sortFields[i]) : items}
                scope="col"
                class="text-muted {asc === 1 ? 'asc' : 'desc'} {rightAlign.includes(column) ? 'text-right' : ''}"
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
          {#each items.slice(0, renderMax) as item, i (item['id'] ?? i)}
            <slot {item} {i}/>
          {/each}
          {#if renderMax < items.length}
            <td colspan={columns.length} class="text-center" style="height: {window.innerHeight}px"><Spinner class="py-24 h-11"/></td>
          {/if}
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
  table {
    @apply relative bg-white min-w-full divide-y divide-gray-200 md:rounded-lg md:shadow border-separate border-spacing-0
  }

  table :global(th), table :global(td) {
    @apply px-4 py-3 border-b border-gray-200
  }

  table thead th {
    @apply text-xs font-medium uppercase tracking-wider sticky top-0 bg-white border-b-2 border-gray-200 border-solid;
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
