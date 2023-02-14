import {fireEvent, render} from '@testing-library/svelte'
import Tabs from './Tabs.svelte'

describe('Tabs', () => {

  const items = ['tab1', 'tab2', 'tab3', 'tab4']

  it('renders tabs', async () => {
    const {container} = render(Tabs, {items})
    expect(container.querySelector('nav')).to.exist
    const tabList = container.querySelectorAll('a')
    expect(tabList.length).to.eq(4)
  })

  it('has first tab selected by default', async () => {
    const {container} = render(Tabs, {items})
    const tabList = container.querySelectorAll('a')
    expect(tabList[0].classList.contains('border-primary-500')).to.be.true
    expect(tabList[0].classList.contains('border-transparent')).to.be.false
    expect(tabList[1].classList.contains('border-transparent')).to.be.true
    expect(tabList[2].classList.contains('border-transparent')).to.be.true
    expect(tabList[3].classList.contains('border-transparent')).to.be.true
  })

  it('can select active tab by clicking', async () => {
    const {container} = render(Tabs, {items})
    const tabList = container.querySelectorAll('a')
    expect(tabList[2].classList.contains('border-primary-500')).to.be.false
    expect(tabList[2].classList.contains('border-transparent')).to.be.true
    await fireEvent.click(tabList[2])
    expect(tabList[0].classList.contains('border-primary-500')).to.be.false
    expect(tabList[0].classList.contains('border-transparent')).to.be.true
    expect(tabList[2].classList.contains('border-primary-500')).to.be.true
    expect(tabList[2].classList.contains('border-transparent')).to.be.false
  })
})
