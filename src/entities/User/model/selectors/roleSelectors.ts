import {StateSchema} from 'app/providers/StoreProvider'
import {createSelector} from '@reduxjs/toolkit'
import {UserRole} from '../consts/consts'

const getUserRoles = (state: StateSchema) => state.user.authData?.roles

const isUserAdmin = createSelector(getUserRoles, roles => Boolean(roles?.includes(UserRole.ADMIN)))
const isUserManager = createSelector(getUserRoles, roles => Boolean(roles?.includes(UserRole.MANAGER)))

export {
  getUserRoles,
  isUserAdmin,
  isUserManager,
}
