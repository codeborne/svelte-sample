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

export default {
  'user': {user: admin} as AuthenticatedUser,
  'users/search': [{id: 1, name: 'Anton'}, {id: 2, name: 'Erkki'}, {id: 3, name: 'Elis'}, {id: 4, name: 'Markus'}]
}
