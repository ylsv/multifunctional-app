import {createAsyncThunk} from '@reduxjs/toolkit'
import {User, userActions} from '@/entities/User'
import {USER_LOCALSTORAGE_KEY} from '@/shared/const/localStorage'
import {ThunkConfig} from '@/app/providers/StoreProvider'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'common/loginByUsername',
  async (authData, thunkAPI) => {
    const {dispatch, extra, rejectWithValue} = thunkAPI
    try {
      const response = await extra.api.post<User>('/login', authData)
      if (!response.data) throw new Error()
      // для имитации авторизации храним данные о пользователе в локал-сторадж
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      // плюс сохраняем их в стейт
      dispatch(userActions.setAuthData(response.data))
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue('error')
    }
  }
)
