import {getProfileIsLoading} from './getProfileIsLoading'
import {StateSchema} from 'app/providers/StoreProvider'

describe('getProfileIsLoading', () => {
  test('should return is loading', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true
      }
    }

    expect(getProfileIsLoading(state as StateSchema)).toBe(true)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileIsLoading(state as StateSchema)).toBe(undefined)
  })
})

