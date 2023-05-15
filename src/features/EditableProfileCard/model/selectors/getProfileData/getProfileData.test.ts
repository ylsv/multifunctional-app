import {getProfileData} from './getProfileData'
import {StateSchema} from 'app/providers/StoreProvider'
import {Country} from 'entities/Country'
import {Currency} from 'entities/Currency'

describe('getProfileData', () => {
  test('should return profile data object', () => {
    const data = {
      username: 'admin',
      age: '22',
      country: Country.Armenia,
      lastname: 'Tankian',
      firstname: 'Serge',
      city: 'Yerevan',
      currency: Currency.RUB,
    }

    const state: DeepPartial<StateSchema> = {
      profile: {data}
    }

    expect(getProfileData(state as StateSchema)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})

