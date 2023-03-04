import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Profile, ProfileSchema} from '../types/profile'
import {fetchProfileData} from '../services/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state: ProfileSchema) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state: ProfileSchema, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchProfileData.rejected, (state: ProfileSchema, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {actions: profileActions} = profileSlice
export const {reducer: profileReducer} = profileSlice
