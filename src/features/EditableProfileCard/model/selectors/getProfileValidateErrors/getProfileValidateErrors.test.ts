import {getProfileValidateErrors} from './getProfileValidateErrors'
import {StateSchema} from '@/app/providers/StoreProvider'
import {ValidateProfileError} from '../../consts/consts'

describe('getProfileValidateErrors', () => {
  test('should return validate errors', () => {
    const validateErrors = [ValidateProfileError.NO_DATA, ValidateProfileError.INCORRECT_USER_DATA]

    const state: DeepPartial<StateSchema> = {
      profile: {validateErrors}
    }

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(validateErrors)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})

