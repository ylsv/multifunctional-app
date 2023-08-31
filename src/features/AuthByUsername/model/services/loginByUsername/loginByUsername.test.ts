// import axios from 'axios'
import {loginByUsername} from './loginByUsername'
import {userActions} from '@/entities/User'
// import {Dispatch} from '@reduxjs/toolkit'
// import {StateSchema} from 'app/providers/StoreProvider'
import {TestAsyncThunk} from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'


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
  // test('successful common', async () => {
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
  // test('error common', async () => {
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

  test('successful common', async () => {
    const userValue = {username: 'user', id: '1'}
    const thunk = new TestAsyncThunk(loginByUsername)
    // здесь мы мокаем ответ от сервера на вызов метода пост
    thunk.api.post.mockReturnValue(Promise.resolve({data: userValue}))

    const result = await thunk.callThunk({username: 'admin', password: '123'})

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('error common', async () => {
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

    const result = await thunk.callThunk({username: 'admin', password: '123'})

    expect(thunk.api.post).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
