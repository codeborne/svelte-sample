import {debounce} from './debounce'

it('debounces', () => {
  vi.useFakeTimers()
  const f = vi.fn()
  const debounced = debounce(f, 300)

  debounced('Hello')
  expect(f).not.toHaveBeenCalled()

  vi.advanceTimersByTime(1)
  expect(f).toHaveBeenCalledWith('Hello')
  expect(f.mock.calls.length).to.eq(1)

  debounced('Hello')
  debounced('Hello')
  expect(f.mock.calls.length).to.eq(1)

  vi.advanceTimersByTime(300)
  expect(f.mock.calls.length).to.eq(2)

  debounced('Hello')
  debounced('Hello')
  expect(f.mock.calls.length).to.eq(2)
  vi.advanceTimersByTime(300)
  expect(f.mock.calls.length).to.eq(3)
})
