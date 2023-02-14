import {fake} from 'sinon'
import {debounce} from './debounce'

it('debounces', () => {
  vi.useFakeTimers()
  const f = fake()
  const debounced = debounce(f, 300)

  debounced('Hello')
  expect(f).not.called

  vi.advanceTimersByTime(1)
  expect(f).calledWith('Hello')
  expect(f.callCount).to.eq(1)

  debounced('Hello')
  debounced('Hello')
  expect(f.callCount).to.eq(1)

  vi.advanceTimersByTime(300)
  expect(f.callCount).to.eq(2)

  debounced('Hello')
  debounced('Hello')
  expect(f.callCount).to.eq(2)
  vi.advanceTimersByTime(300)
  expect(f.callCount).to.eq(3)
})
