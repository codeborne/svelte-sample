import {render} from '@testing-library/svelte'
import Card from './Card.svelte'

describe('Card', () => {
  const title = 'a title'
  const subtitle = 'a subtitle'

  it('renders card normally', async () => {
    const {container} = render(Card, {title, subtitle})
    const card = container.querySelector('.card')
    expect(card).to.exist
    expect(card!.textContent).to.contain(title)
    expect(card!.textContent).to.contain(subtitle)
  })

  it('does not render card title containers if not given', async () => {
    const {container} = render(Card, {title: '', subtitle})
    expect(container.querySelector('.card .h3')).to.not.exist
    expect(container.textContent).to.not.contain(subtitle)
  })
})
