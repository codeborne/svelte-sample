import {render} from '@testing-library/svelte'
import Button from './Button.svelte'
import {_} from '../i18n'

it('can assign button type', () => {
  const {container} = render(Button, {type: 'submit', label: 'title'})
  const button = container.querySelector('button')!
  expect(button.getAttribute('type')).to.eq('submit')
  expect(button.textContent).to.contain(_('title'))
})

it('button type is `button` by default', () => {
  const {container} = render(Button)
  expect(container.querySelector('button')!.getAttribute('type')).to.eq('button')
})
