import {Role} from 'src/api/types'
import type {User, AuthenticatedUser} from 'src/api/types'

export const admin: User = {
  id: 'admin-id',
  lang: 'et',
  firstName: 'Test',
  lastName: 'Admin',
  email: 'admin@codeborne.com',
  role: Role.ADMIN
}

export const user: AuthenticatedUser = {user: admin}
