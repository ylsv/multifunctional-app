import {counterActions, counterReducer} from './counterSlice'
import {CounterSchema} from '../types/counterSchema'

describe('userSlice.test', () => {
  test('should increment value', () => {
    // здесь не нужен deep-partial, тк мы тестируем не весь стейт, а конкретный редьюсер, куда передается конкретный участок стейта
    const state: CounterSchema = {value: 10}
    expect(counterReducer(state, counterActions.increment()))
      .toEqual({value: 11})
  })

  test('should decrement value', () => {
    const state: CounterSchema = {value: 10}
    expect(counterReducer(state, counterActions.decrement()))
      .toEqual({value: 9})
  })

  test('should work with empty state', () => {
    const state: CounterSchema = undefined
    expect(counterReducer(state, counterActions.increment()))
      .toEqual({value: 1})
  })
})
