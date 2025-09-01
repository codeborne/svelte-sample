import {cleanup, render} from '@testing-library/svelte'
import Modal from './Modal.svelte'
import type {Snippet} from 'svelte'

it.skip('Modal is shown', async () => {
  const {container, rerender} = render(Modal, {title: 'Title', show: false, children: (() => 'Modal content') as unknown as Snippet})
  expect(container.textContent).not.to.contain('Title')

  await rerender({show: true})
  expect(container.textContent).to.contain('Title')
  expect(document.body.classList.contains('modal-open')).to.be.true

  await rerender({show: false})
  expect(document.body.classList.contains('modal-open')).to.be.false
})

it.skip('body.modal-open is added on show and removed on destroy', () => {
  render(Modal, {title: 'Title', show: true, children: (() => 'Modal content') as unknown as Snippet})
  expect(document.body.classList.contains('modal-open')).to.be.true
  cleanup()
  expect(document.body.classList.contains('modal-open')).to.be.false
  expect(document.querySelector('.modal')).not.to.exist
})
