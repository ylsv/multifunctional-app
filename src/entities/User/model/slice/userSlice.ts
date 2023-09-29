import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserSchema} from '../types/user'
import {USER_LOCALSTORAGE_KEY} from '@/shared/const/localStorage'
import {setFeatureFlags} from '@/shared/lib/features'
import {saveJsonSettings} from '../services/saveJsonSettings'
import {JsonSettings} from '../types/jsonSettings'
import {initAuthData} from '../services/initAuthData'

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
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id)
    },
    logout: (state: UserSchema) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload
        }
      })
    builder
      .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
        state.authData = action.payload
        setFeatureFlags(action.payload.features)
        state._initialized = true
      })
    builder
      .addCase(initAuthData.rejected, (state) => {
        state._initialized = true
      })
  },
})

export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice
