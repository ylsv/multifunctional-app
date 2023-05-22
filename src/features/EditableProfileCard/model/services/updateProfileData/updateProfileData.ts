import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkConfig} from 'app/providers/StoreProvider'
import {getProfileForm} from '../../selectors/getProfileForm/getProfileForm'
import {validateProfileData} from '../../services/validateProfileData/validateProfileData'
import {Profile} from 'entities/Profile'
import {ValidateProfileError} from '../../consts/consts'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {extra, rejectWithValue, getState} = thunkAPI

    const formData = getProfileForm(getState())
    const {id: profileId} = formData || {}

    const errors = validateProfileData(formData)

    if (errors.length) return rejectWithValue(errors)

    try {
      const response = await extra.api.put<Profile>('/profiles/' + profileId, formData)

      if (!response.data) throw new Error()

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  }
)
