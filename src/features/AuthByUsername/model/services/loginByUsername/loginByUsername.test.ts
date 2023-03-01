import axios from 'axios'
import {loginByUsername} from './loginByUsername'
import {userActions} from 'entities/User'
// import {Dispatch} from '@reduxjs/toolkit'
// import {StateSchema} from 'app/providers/StoreProvider'
import {TestAsyncThunk} from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

// делаем мок аксиоса
jest.mock('axios')
// и типизируем его, чтобы тс подхватывал значения методов библиотеки
const mockedAxios = jest.mocked(axios, true)

describe('loginByUsername.test', () => {
  // let dispatch: Dispatch
  // let getState: () => StateSchema
  //
  // // перед каждым тестом делаем моки для dispatch и getState
  // beforeEach(() => {
  //   dispatch = jest.fn()
  //   getState = jest.fn()
  // })
  //
  // test('successful login', async () => {
  //   const userValue = {username: 'user', id: '1'}
  //   // здесь мы мокаем ответ от сервера на вызов метода пост
  //   mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))
  //   const action = loginByUsername({username: 'admin', password: '123'})
  //   const result = await action(dispatch, getState, undefined)
  //
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
  //   expect(dispatch).toHaveBeenCalledTimes(3)
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //   expect(result.meta.requestStatus).toBe('fulfilled')
  //   expect(result.payload).toEqual(userValue)
  // })
  //
  // test('error login', async () => {
  //   const userValue = {username: 'user', id: '1'}
  //   mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))
  //   const action = loginByUsername({username: 'admin', password: '123'})
  //   const result = await action(dispatch, getState, undefined)
  //
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //   expect(dispatch).toHaveBeenCalledTimes(2)
  //   expect(result.meta.requestStatus).toBe('rejected')
  //   expect(result.payload).toBe('error')
  // })

  test('successful login', async () => {
    const userValue = {username: 'user', id: '1'}
    // здесь мы мокаем ответ от сервера на вызов метода пост
    mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))

    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({username: 'admin', password: '123'})

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('error login', async () => {
    const userValue = {username: 'user', id: '1'}
    mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))

    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({username: 'admin', password: '123'})

    expect(mockedAxios.post).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
