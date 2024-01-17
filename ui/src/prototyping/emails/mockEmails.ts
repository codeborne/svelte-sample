import {writable} from 'svelte/store'
import type {MockEmailNotification, MockEmailNotificationSlug} from './MockEmailNotification'

function createMockEmailNotifications() {
  const {update, subscribe} = writable<MockEmailNotification[]>([])

  const showMockEmailNotification = (slug: MockEmailNotificationSlug) => {
    const id = new Date().getTime()
    const notification = {id, slug}
    update(mockEmailNotifications => ([...mockEmailNotifications, notification]))

    // setTimeout(() => {
    //   closeMockEmailNotification(notification)
    // }, 4000)
  }

  const closeMockEmailNotification = (emailNotification: MockEmailNotification) => {
    update(mockEmailNotifications => mockEmailNotifications.filter(t => t.id !== emailNotification.id))
  }

  return {
    subscribe,
    showMockEmailNotification,
    closeMockEmailNotification
  }
}

export const mockEmailNotifications = createMockEmailNotifications()

export const mockEmailSender = 'Codeborne'
export const emailLegalText = 'This message may contain confidential information or personal data. If you have received a message in error,\n' +
  '    please inform the sender by clicking the "Reply" button, then delete the message from your computer. Do not make\n' +
  '    copies, distribute or store this message.'

export const mockEmails = [
  {
    slug: 'example-email',
    subject: 'This is an example subject',
    title: 'This is a title within the email',
    message: 'This is a text that describes the content in a more detail way',
    callToAction: 'Primary action text',
    fallbackMessage: 'Something that is displayed after the primary action',
    linkRoute: '/'
  },
  {
    slug: 'verify-email',
    subject: 'Confirm your email',
    title: 'Confirm your email',
    message: '<p>Click below to verify your email address and proceed with the sign up process</p>',
    callToAction: 'Confirm and proceed...',
    fallbackMessage: null,
    linkRoute: "/apply-contract-data"
  },
  {
    slug: 'password-reset',
    subject: 'Reset your password 🔑',
    title: 'Reset your password 🔑',
    message: '<p>Hello Jonathan, we got a request to reset your password.</p>',
    callToAction: 'Change password',
    fallbackMessage: 'If you did not initiate this, please ignore this e-mail',
    linkRoute: "/password-set"
  },
]
