import {getCounter} from './getCounter'
import {DeepPartial} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'

describe('getCounter', () => {
  test('should return counter value object', () => {
    // DeepPartial используется для тестирования и позовляет использовать в тесте не весть стейт, а его часть
    const state: DeepPartial<StateSchema> = {
      counter: {value: 10}
    }
    // приводим стейт к типу стейт-схемы, т.к. из-за DeepPartial линтер тс будет ругаться
    expect(getCounter(state as StateSchema)).toEqual({value: 10})
  })
})

