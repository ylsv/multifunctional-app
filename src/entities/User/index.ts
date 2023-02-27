import {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData'
import {userReducer, userActions} from './model/slice/userSlice'
import {User, UserSchema} from './model/types/user'


export {
  userReducer,
  userActions,
  User,
  UserSchema,
  getUserAuthData,
}
