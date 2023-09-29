import {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData'
import {getUserInitialized} from './model/selectors/getUserInitialized/getUserInitialized'
import {getUserRoles, isUserAdmin, isUserManager} from './model/selectors/roleSelectors'
import {userActions, userReducer} from './model/slice/userSlice'
import {User, UserSchema} from './model/types/user'
import {UserRole} from './model/consts/consts'
import {getJsonSettings, useJsonSettings} from './model/selectors/jsonSettings'
import {saveJsonSettings} from './model/services/saveJsonSettings'
import {initAuthData} from './model/services/initAuthData'

export {
  userReducer,
  userActions,
  getUserAuthData,
  getUserInitialized,
  getUserRoles,
  isUserAdmin,
  isUserManager,
  UserRole,
  getJsonSettings,
  useJsonSettings,
  saveJsonSettings,
  initAuthData,
}

export type {
  User,
  UserSchema,
}
