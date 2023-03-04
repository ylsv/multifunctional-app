import axios, {AxiosStatic} from 'axios'
import {StateSchema} from 'app/providers/StoreProvider'
import {AsyncThunkAction} from '@reduxjs/toolkit'

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) =>
  AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

// делаем мок аксиоса
jest.mock('axios')
// и типизируем его, чтобы тс подхватывал значения методов библиотеки
const mockedAxios = jest.mocked(axios, true)

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>
  getState: () => StateSchema
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

  api: jest.MockedFunctionDeep<AxiosStatic>
  navigate: jest.MockedFn<any>

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
    this.dispatch = jest.fn()
    this.getState = jest.fn()
    this.actionCreator = actionCreator

    this.api = mockedAxios
    this.navigate = jest.fn()
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    const extraObj = {
      api: this.api,
      navigate: this.navigate
    }
    const result = await action(this.dispatch, this.getState, extraObj)

    return result
  }
}
