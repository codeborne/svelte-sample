import {act, render} from '@testing-library/svelte'
import AutocompleteField from './AutocompleteField.svelte'
import api from 'src/api/api'
import {fillInput, findInput} from '../test-utils'

describe('AutocompleteField', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('autocompletes', async () => {
    vi.spyOn(api, 'get').mockResolvedValue([1, 2, 3])

    const {container, component} = render(AutocompleteField, {apiPath: 'customers/search', optionMapper: (o: any) => o + '!'})
    const input = await findInput('input')
    expect(input.getAttribute('list')).to.eq('customers-search-list')
    const datalist = container.querySelector('datalist')!!
    expect(datalist.id).to.eq('customers-search-list')
    expect(datalist.options).to.have.length(0)

    await fillInput(input, 'Co')
    expect(api.get).not.toHaveBeenCalled()

    await fillInput(input, 'Cod ')
    expect(api.get).not.toHaveBeenCalled()
    vi.advanceTimersByTime(500)
    expect(api.get).toHaveBeenCalledWith('customers/search?q=Cod%20')
    await act(() => api.get)
    expect([...datalist.options].map(o => o.value)).to.deep.eq(['1!', '2!', '3!'])
    expect(component.selected).to.be.undefined

    await fillInput(input, '2!')
    vi.advanceTimersByTime(500)
    expect(component.selected).to.eq(2)
  })
})
