import {render} from '@testing-library/svelte'
import Modal from './Modal.svelte'
import {tick} from 'svelte'

it('Modal is shown', async () => {
  const {container, component} = render(Modal, {title: 'Title', show: false, flyParams: {duration: 0}})
  expect(container.textContent).not.to.contain('Title')

  component.$set({show: true})
  await tick()
  expect(container.textContent).to.contain('Title')
  expect(document.body.classList.contains('modal-open')).to.be.true

  component.$set({show: false})
  await tick()
  expect(document.body.classList.contains('modal-open')).to.be.false
})

it('body.modal-open is added on show and removed on destroy', async () => {
  const {component} = render(Modal, {title: 'Title', show: true, flyParams: {duration: 0}})
  expect(document.body.classList.contains('modal-open')).to.be.true
  component.$destroy()
  expect(document.body.classList.contains('modal-open')).to.be.false
  expect(document.querySelector('.modal')).not.to.exist
})
