import {fireEvent, render} from '@testing-library/svelte'
import SubNav from './SubNav.svelte'

describe('SubNav', () => {
  const labelPrefix = 'test'
  const items: Record<string, number|undefined> = {testKey1: 99, testKey2: 50}

  it('renders', async () => {
    const {container} = render(SubNav, {labelPrefix, items})
    const entries = container.querySelectorAll('a')
    expect(entries[0]).to.exist
    expect(entries[1]).to.exist
    expect(entries.length).to.eq(2)
  })

  it('will set clicked element as selected', async () => {
    const {container} = render(SubNav, {labelPrefix, items})
    const entries = container!.querySelectorAll('a')
    expect(entries[0].classList.contains('active')).to.be.true
    await fireEvent.click(entries[1])
    expect(entries[0].classList.contains('active')).to.be.false
    expect(entries[0].classList.contains('inactive')).to.be.true
    expect(entries[1].classList.contains('active')).to.be.true
    expect(entries[1].classList.contains('inactive')).to.be.false
  })

  it('first value element is selected by default', async () => {
    const {container} = render(SubNav, {labelPrefix, items})
    const entries = container!.querySelectorAll('a')
    expect(entries[0].classList.contains('active')).to.be.true
    expect(entries[0].classList.contains('inactive')).to.be.false
    expect(entries[1].classList.contains('active')).to.be.false
    expect(entries[1].classList.contains('inactive')).to.be.true
  })
})
