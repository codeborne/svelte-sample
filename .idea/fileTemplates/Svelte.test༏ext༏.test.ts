import {render} from '@testing-library/svelte'
import {expect} from 'chai'
import ${NAME} from './${NAME}.svelte'

describe('${NAME}', () => {
  it('renders', async () => {
    const {container} = render(${NAME})
    expect(container.textContent).to.contain('TODO')
  })
})
