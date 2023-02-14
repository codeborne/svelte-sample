import {fireEvent, render} from '@testing-library/svelte'
import Form from './Form.svelte'
import {fake} from 'sinon'

describe('Form', () => {
  const submit = () => {}

  it('does not show invalid (unfilled) inputs by default', async () => {
    const {container} = render(Form, {submit})
    expect(container.querySelector('form')!.classList.contains('validated')).to.be.false
  })

  it('shows invalid inputs if requested', async () => {
    const {container} = render(Form, {submit, validated: true})
    expect(container.querySelector('form')!.classList.contains('validated')).to.be.true
  })

  it('calls submit on valid submit', async () => {
    const submit = fake()
    const {container} = render(Form, {submit})
    await fireEvent.submit(container.querySelector('form')!)
    expect(submit).called
  })
})
