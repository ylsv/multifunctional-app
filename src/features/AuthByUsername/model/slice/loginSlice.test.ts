import {LoginSchema} from '../types/LoginSchema'
import {loginReducer, loginActions} from './loginSlice'

describe('loginSlice.test', () => {
  test('should set username', () => {
    const state: DeepPartial<LoginSchema> = {username: 'user'}
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('dick')))
      .toEqual({username: 'dick'})
  })

  test('should set password', () => {
    const state: DeepPartial<LoginSchema> = {password: ''}
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('123')))
      .toEqual({password: '123'})
  })
})
