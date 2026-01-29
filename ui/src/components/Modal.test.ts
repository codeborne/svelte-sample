import {cleanup, render} from '@testing-library/svelte'
import Modal from './Modal.svelte'
import type {Snippet} from 'svelte'

it('Modal is shown', async () => {
  const {rerender} = render(Modal, {title: 'Title', show: false, children: (() => 'Modal content') as unknown as Snippet})
  expect(document.body.textContent).not.to.contain('Title')

  await rerender({show: true})
  expect(document.body.textContent).to.contain('Title')

  await rerender({show: false})
  cleanup()
})
