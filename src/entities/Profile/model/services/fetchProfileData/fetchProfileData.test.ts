import {fetchProfileData} from './fetchProfileData'
import {TestAsyncThunk} from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import {Country} from 'entities/Country'
import {Currency} from 'entities/Currency'

const data = {
  username: 'admin',
  age: '22',
  country: Country.Armenia,
  lastname: 'Tankian',
  firstname: 'Serge',
  city: 'Yerevan',
  currency: Currency.RUB,
}

describe('fetchProfileData.test', () => {
  test('successful fetching', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    // здесь мы мокаем ответ от сервера на вызов метода
    thunk.api.get.mockReturnValue(Promise.resolve({data}))

    const result = await thunk.callThunk()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error response', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))

    const result = await thunk.callThunk()
    expect(result.meta.requestStatus).toBe('rejected')
  })
})
