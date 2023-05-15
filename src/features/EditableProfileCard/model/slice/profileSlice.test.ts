import {profileReducer, profileActions} from './profileSlice'
import {Country} from 'entities/Country'
import {Currency} from 'entities/Currency'
import {updateProfileData} from '../services/updateProfileData/updateProfileData'
import {ProfileSchema, ValidateProfileError} from '../types/EditableProfileCardSchema'

const data = {
  username: 'admin',
  age: '22',
  country: Country.Armenia,
  lastname: 'Tankian',
  firstname: 'Serge',
  city: 'Yerevan',
  currency: Currency.RUB,
}

describe('profileSlice.test', () => {
  test('should set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {readonly: false}
    expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true)))
      .toEqual({readonly: true})
  })

  test('should cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {data}
    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
      .toEqual({
        readonly: true,
        validateErrors: undefined,
        form: data,
        data,
      })
  })

  test('should profile service be pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    }
    expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
      .toEqual({
        isLoading: true,
        validateErrors: undefined,
      })
  })
})
