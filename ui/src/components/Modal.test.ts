import {cleanup, render} from '@testing-library/svelte'
import Modal from './Modal.svelte'
import type {Snippet} from 'svelte'

it('Modal is shown', async () => {
  const {container, rerender} = render(Modal, {title: 'Title', show: false, children: (() => 'Modal content') as unknown as Snippet})
  expect(container.textContent).not.to.contain('Title')

  await rerender({show: true})
  expect(container.textContent).to.contain('Title')

  await rerender({show: false})
})
