export type MockEmailNotification = {
  id: number
  slug: MockEmailNotificationSlug
}

export type MockEmailNotificationSlug = 'verify-email' | 'password-reset' | 'example-email'
