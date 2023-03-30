import {getCommentFormText} from './getCommentFormState'
import {StateSchema} from 'app/providers/StoreProvider'

describe('getCommentFormText', () => {
  test('should return text', () => {
    const data = {
      text: 'comment text',
      error: undefined,
    }

    const state: DeepPartial<StateSchema> = {
      addCommentForm: data
    }

    expect(getCommentFormText(state as StateSchema)).toEqual(data.text)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getCommentFormText(state as StateSchema)).toEqual(undefined)
  })
})

