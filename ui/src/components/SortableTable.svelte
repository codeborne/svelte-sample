<script lang="ts">
  import {_} from 'src/i18n'
  import Spinner from 'src/components/Spinner.svelte'
  import {debounce} from 'src/shared/debounce'

  type Column = keyof T | '' | false | undefined
  type Field = Column | ((item: T) => any)
  type T = $$Generic

  export let id: string|undefined = undefined
  export let items: T[]|undefined
  export let labels: string = ''
  export let columns: (Column | [string, Field])[]
  export let rightAlignFrom: keyof T | undefined = undefined
  export let rightAlign: (Column | string)[] = []
  export let sortedBy: Field = undefined, asc = 1
  export let renderMax = 100

  $: fields = columns.map(c => c instanceof Array ? c[1] ?? c[0] : c) as Field[]
  $: columnLabels = columns.map(c => c instanceof Array ? c[0] : c) as (string|undefined)[]
  $: if (rightAlignFrom) rightAlign = columnLabels.slice(fields.indexOf(rightAlignFrom))
  $: rightAlignIndices = new Set(rightAlign.map(c => columnLabels.indexOf(c as string)))

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

  function findScrollParent(el: HTMLElement | null): HTMLElement {
    if (!el) return document.documentElement
    const overflow = el.computedStyleMap?.().get('overflow-y')
    return overflow == 'auto' || overflow == 'scroll' ? el : findScrollParent(el.parentElement)
  }

  let scrollable: HTMLElement
  function renderMoreOnScroll(el: HTMLElement) {
    scrollable = findScrollParent(el)

    const onScroll = debounce(() => {
        if (!items || renderMax >= items.length) return
        const scrollMax = scrollable.scrollHeight - scrollable.clientHeight * 1.2
        if (scrollable.scrollTop >= scrollMax) {
          renderMax = items.length
          queueMicrotask(() => scrollable.scrollTo(0, scrollable.scrollHeight))
        } else if (scrollable.scrollTop + scrollable.clientHeight > scrollMax) renderMax += 50
      }, 300)

    ;(scrollable === document.documentElement ? window : scrollable).addEventListener('scroll', onScroll)
    return { destroy: () => scrollable.removeEventListener('scroll', onScroll) }
  }
</script>

<div class="-mx-6 overflow-x-auto md:mx-0 md:overflow-visible {$$props.class ?? ''}" use:renderMoreOnScroll>
  <div class="min-w-full pb-3">
    <table {id} class={labels.replace('.', '-')}>
      <thead>
      <tr>
        {#each columnLabels as column, i}
          {#if column || column === ''}
            <th on:click={() => items = items && !!column ? sortBy(items, fields[i]) : items}
                scope="col"
                class="text-muted {asc === 1 ? 'asc' : 'desc'} {rightAlignIndices.has(i) ? 'text-right' : ''}"
                class:sortable={!!column}
                class:sorted={sortedBy === fields[i]}>
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
            <slot {item} {i}>
              <tr>
                {#each fields as f, fi}
                  <td class:text-right={rightAlignIndices.has(fi)}>{get(item, f)}</td>
                {/each}
              </tr>
            </slot>
          {/each}
          {#if renderMax < items.length}
            <td colspan={columns.length} class="text-center" style="height: {scrollable?.clientHeight}px">
              <Spinner class="py-24 h-11"/>
            </td>
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

<style global>
  table {
    @apply relative bg-white min-w-full divide-y divide-gray-200 border-separate border-spacing-0
  }

  table th, table td {
    @apply px-4 py-3 border-b border-gray-200
  }

  table thead th {
    @apply text-xs font-medium uppercase tracking-wider sticky top-0 bg-white border-b-2 border-gray-200 border-solid;
  }

  table th:last-child, td:last-child:not(:first-child) {
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
