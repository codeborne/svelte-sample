import {render} from '@testing-library/svelte'
import Card from './Card.svelte'

describe('Card', () => {

  const title: string = 'a title'
  const subtitle: string = 'a subtitle'
  const padding = 'px-4 py-5 sm:p-6 -mx-6 sm:mx-0'
  let split = false

  it('renders card normally', async () => {
    const {container} = render(Card, {title, subtitle, padding, split})
    const card = container.querySelector('.card')
    expect(card).to.exist
    expect(card!.textContent).to.contain(title)
    expect(card!.textContent).to.contain(subtitle)
  })

  it('does not render card title containers if not given', async () => {
    const {container} = render(Card, {title:'', subtitle, padding, split})
    expect(container.querySelector('.card .h3')).to.not.exist
    expect(container.textContent).to.not.contain(subtitle)
  })
})
