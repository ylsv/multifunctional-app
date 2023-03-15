import {getProfileError} from './getProfileError'
import {StateSchema} from 'app/providers/StoreProvider'

describe('getProfileError', () => {
  test('should return error text', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: 'error text'
      }
    }

    expect(getProfileError(state as StateSchema)).toEqual('error text')
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})

