import {addCommentFormActions, addCommentFormReducer} from './addCommentFormSlice'
import {AddCommentFormSchema} from '../types/addCommentForm'

const data = {
  text: '',
  error: undefined,
}

describe('addCommentFormSlice.test', () => {
  test('should set text', () => {
    const state: DeepPartial<AddCommentFormSchema> = data
    expect(addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('test text')))
      .toEqual({
        ...data,
        text: 'test text'
      })
  })
})
