import {validateProfileData} from './validateProfileData'
import {Country} from 'entities/Country'
import {Currency} from 'entities/Currency'
import {ValidateProfileError} from '../../consts/consts'

const data = {
  username: 'admin',
  age: '22',
  country: Country.Armenia,
  lastname: 'Tankian',
  firstname: 'Serge',
  city: 'Yerevan',
  currency: Currency.RUB,
}

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without first and last name', async () => {
    const result = validateProfileData({
      ...data,
      firstname: '',
      lastname: '',
    })
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })

  test('without age', async () => {
    const result = validateProfileData({
      ...data,
      age: undefined,
    })
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
  })

  test('without country', async () => {
    const result = validateProfileData({
      ...data,
      country: undefined,
    })
    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY])
  })

  test('without profile data', async () => {
    const result = validateProfileData({})
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ])
  })
})
