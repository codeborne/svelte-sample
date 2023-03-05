import {fireEvent, render} from '@testing-library/svelte'
import {expect} from 'chai'
import MultipleSelect from './MultipleSelect.svelte'
describe('MultipleSelect', () => {
  it('waits for options to load', () => {
    render(MultipleSelect, {values: ['x'], options: undefined})
  })

  it('renders and selects', async () => {
    const {container} = render(MultipleSelect, {values: ['x'], options: {x: 111, y: 222, z: 333}})
    const select = container.querySelector('select')!
    expect(select.value).to.eq('')

    const options = container.querySelectorAll('option')
    expect(container.querySelector('.badge')!.textContent!.trim()).to.eq('111')
    expect(options).to.have.length(3)
    expect(options[0].textContent).to.eq('+')
    expect(options[0].value).to.eq('')

    select.value = 'z'
    await fireEvent.change(select)
    expect(container.querySelectorAll('.badge')).to.have.length(2)
    expect(container.querySelectorAll('option')).to.have.length(2)

    select.value = 'y'
    await fireEvent.change(select)
    expect(container.querySelectorAll('.badge')).to.have.length(3)
    expect(container.querySelector('select')).to.not.exist

    await fireEvent.click(container.querySelectorAll('.badge')[1].querySelector('.icon.x')!)
    expect(container.querySelectorAll('.badge')).to.have.length(2)
    expect(container.querySelectorAll('option')).to.have.length(2)
    expect(container.querySelector('select')!.selectedIndex).to.eq(0)
  })
})
