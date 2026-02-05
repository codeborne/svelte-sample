import {render} from '@testing-library/svelte'
import Button from './Button.svelte'

it('can assign button type', () => {
  const {container} = render(Button, {type: 'submit', label: 'title'})
  const button = container.querySelector('button')!
  expect(button.getAttribute('type')).to.eq('submit')
  expect(button.textContent).to.contain('title')
})

it('button type is `button` by default', () => {
  const {container} = render(Button)
  expect(container.querySelector('button')!.getAttribute('type')).to.eq('button')
})

it('renders icon at the start', () => {
  const {container} = render(Button, {icon: 'user', label: 'Profile'})
  const button = container.querySelector('button')!
  expect(button.classList.contains('has-icon')).to.be.true
  const icons = button.querySelectorAll('svg')
  expect(icons.length).to.eq(1)
})

it('renders iconEnd at the end', () => {
  const {container} = render(Button, {iconEnd: 'chevron-down', label: 'Menu'})
  const button = container.querySelector('button')!
  expect(button.classList.contains('has-icon')).to.be.true
  const icons = button.querySelectorAll('svg')
  expect(icons.length).to.eq(1)
})

it('renders both icon and iconEnd', () => {
  const {container} = render(Button, {icon: 'arrow-left', iconEnd: 'arrow-right', label: 'Both'})
  const button = container.querySelector('button')!
  expect(button.classList.contains('has-icon')).to.be.true
  const icons = button.querySelectorAll('svg')
  expect(icons.length).to.eq(2)
})

it('icon-only class applies when only icon with no label', () => {
  const {container} = render(Button, {icon: 'user'})
  const button = container.querySelector('button')!
  expect(button.classList.contains('icon-only')).to.be.true
})

it('icon-only class does not apply when iconEnd is present', () => {
  const {container} = render(Button, {icon: 'user', iconEnd: 'chevron-down'})
  const button = container.querySelector('button')!
  expect(button.classList.contains('icon-only')).to.be.false
})

it('renders as link when to prop is provided', () => {
  const {container} = render(Button, {to: '/profile', label: 'View Profile'})
  const link = container.querySelector('a')!
  expect(link).to.exist
  expect(link.classList.contains('btn')).to.be.true
  expect(link.textContent).to.contain('View Profile')
  expect(container.querySelector('button')).to.not.exist
})

it('renders as button when to prop is not provided', () => {
  const {container} = render(Button, {label: 'Click me'})
  const button = container.querySelector('button')!
  expect(button).to.exist
  expect(button.classList.contains('btn')).to.be.true
  expect(container.querySelector('a')).to.not.exist
})

it('button as link maintains all styling classes', () => {
  const {container} = render(Button, {
    to: '/profile',
    label: 'Profile',
    size: 'lg',
    color: 'primary',
    variant: 'soft',
    icon: 'user'
  })
  const link = container.querySelector('a')!
  expect(link.classList.contains('btn')).to.be.true
  expect(link.classList.contains('lg')).to.be.true
  expect(link.classList.contains('primary')).to.be.true
  expect(link.classList.contains('soft')).to.be.true
  expect(link.classList.contains('has-icon')).to.be.true
})

it('button as link works with iconEnd', () => {
  const {container} = render(Button, {to: '/docs', label: 'Docs', iconEnd: 'link-external'})
  const link = container.querySelector('a')!
  expect(link).to.exist
  const icons = link.querySelectorAll('svg')
  expect(icons.length).to.eq(1)
})
