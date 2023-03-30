import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AddCommentFormSchema} from '../types/addCommentForm'

const initialState: AddCommentFormSchema = {
  text: '',
  error: undefined,
}

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText: (state:AddCommentFormSchema, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const {actions: addCommentFormActions} = addCommentFormSlice
export const {reducer: addCommentFormReducer} = addCommentFormSlice
