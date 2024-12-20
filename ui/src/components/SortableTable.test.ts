import {fireEvent, render} from '@testing-library/svelte'
import SortableTable from './SortableTable.svelte'
import enDict from 'i18n/en.json'

describe('SortableTable', () => {
  it('sorts items by clicking on headers', async () => {
    const items = [{a: 2, b: 'zzz'}, {a: 1, b: 'aaa'}]
    const labels = enDict.addresses
    const columns: any[] = [['country', 'a'], ['street', 'b']]
    const {container, component} = render(SortableTable, {labels, items, columns, class: 'another-class'})
    expect(container.querySelector('.another-class')).to.be.ok
    expect(container.textContent).to.contain(enDict.addresses.country)
    expect(container.textContent).to.contain(enDict.addresses.street)
    expect(component.items).to.deep.equal(items)

    const headers = container.querySelectorAll('th')
    await fireEvent.click(headers[0])
    expect(headers[0].classList.contains('sorted')).to.be.true
    expect(headers[0].classList.contains('asc')).to.be.true
    // TODO: how to get internal state of the component in Svelte 5?
    // expect(component.items).to.deep.equal(items)

    await fireEvent.click(headers[0])
    expect(headers[0].classList.contains('desc')).to.be.true
    // expect(component.items).to.deep.equal(items.reverse())
  })

  it('do not sort columns with empty headers', async () => {
    const items = [{a: 2, b: 'zzz'}, {a: 1, b: 'aaa'}]
    const labels = enDict.addresses
    const columns: any[] = [['', 'a'], ['time', 'b']]
    const {container, component} = render(SortableTable, {labels, items, columns, class: 'another-class'})

    const headers = container.querySelectorAll('th')
    await fireEvent.click(headers[0])
    expect(headers[0].classList.contains('sorted')).to.be.false
    expect(component.items).to.deep.equal(items)
  })

  it('shows spinner if items not yet loaded', async () => {
    const {container} = render(SortableTable, {items: undefined, columns: []})
    expect(container.querySelector('tbody')).to.exist
    expect(container.querySelector('.spinner')).to.exist
  })

  it('handles no items', async () => {
    const {container} = render(SortableTable, {items: [], columns: []})
    expect(container.querySelector('tbody')!.textContent).to.eq(enDict.general.noItems)
  })
})
