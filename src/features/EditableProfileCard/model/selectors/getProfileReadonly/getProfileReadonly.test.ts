import {getProfileReadonly} from './getProfileReadonly'
import {StateSchema} from '@/app/providers/StoreProvider'

describe('getProfileReadonly', () => {
  test('should return readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: false
      }
    }

    expect(getProfileReadonly(state as StateSchema)).toBe(false)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileReadonly(state as StateSchema)).toBe(undefined)
  })
})

