import {Story} from '@storybook/react'
import {StateSchema, StoreProvider} from '@/app/providers/StoreProvider'
import {loginReducer} from '@/features/AuthByUsername'
import {ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
// eslint-disable-next-line ylsv-plugin/public-api-checker
import {articleDetailsReducer} from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line ylsv-plugin/public-api-checker
import {addCommentFormReducer} from '@/features/AddCommentForm/model/slice/addCommentFormSlice'
// eslint-disable-next-line ylsv-plugin/public-api-checker
import {articleDetailsPageReducer} from '@/pages/ArticleDetailsPage/model/slice'
// eslint-disable-next-line ylsv-plugin/public-api-checker
import {profileReducer} from '@/features/EditableProfileCard/model/slice/profileSlice'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{...asyncReducers, ...defaultAsyncReducers}}>
    <StoryComponent/>
  </StoreProvider>
)
