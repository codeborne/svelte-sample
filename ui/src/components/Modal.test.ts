import {render} from '@testing-library/svelte'
import Modal from './Modal.svelte'
import {tick} from 'svelte'

it('Modal is shown', async () => {
  HTMLDialogElement.prototype.showModal = vi.fn()

  const {container, component} = render(Modal, {title: 'Title', show: false})
  expect(container.textContent).not.to.contain('Title')

  component.$set({show: true})
  await tick()
  expect(container.textContent).to.contain('Title')
  expect(HTMLDialogElement.prototype.showModal).toBeCalled()
})
