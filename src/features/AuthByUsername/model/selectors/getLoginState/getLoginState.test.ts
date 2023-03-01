import {DeepPartial} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'
import {getLoginState} from './getLoginState'

describe('getLoginState', () => {
  test('to have error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'errorText',
      }
    }
    expect(getLoginState(state as StateSchema)).toHaveProperty('error','errorText')
  })
  test('to have username', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'user',
      }
    }
    expect(getLoginState(state as StateSchema)).toHaveProperty('username','user')
  })
  test('to be loading', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      }
    }
    expect(getLoginState(state as StateSchema)).toHaveProperty('isLoading',true)
  })
  test('to have password', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123',
      }
    }
    expect(getLoginState(state as StateSchema)).toHaveProperty('password','123')
  })
  test('to be empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginState(state as StateSchema)).toBe(undefined)
  })
})
