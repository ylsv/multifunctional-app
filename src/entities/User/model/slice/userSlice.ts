import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserSchema} from '../types/user'
import {USER_LOCALSTORAGE_KEY} from '@/shared/const/localStorage'
import {setFeatureFlags} from '@/shared/lib/features'

const initialState: UserSchema = {
  _initialized: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state: UserSchema, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    initAuthData: (state: UserSchema) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        const json = JSON.parse(user) as User
        state.authData = json
        setFeatureFlags(json.features)
      }
      state._initialized = true
    },
    logout: (state: UserSchema) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
})

export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice
