import {UserSchema} from 'entities/User'
import {LoginSchema} from 'features/AuthByUsername'
import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {AxiosInstance} from 'axios'
import {ArticleDetailsSchema} from 'entities/Article'
import {AddCommentFormSchema} from 'features/AddCommentForm'
import {ArticlesPageSchema} from 'pages/ArticlesPage'
import {UISchema} from 'features/UI'
import {ArticleDetailsPageSchema} from 'pages/ArticleDetailsPage'
import {rtkApi} from 'shared/api/rtkApi'
import {ProfileSchema} from 'features/EditableProfileCard'

export interface StateSchema {
  user: UserSchema
  ui: UISchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // async reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
  articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - редюсер вмонтирован, false - редюсер демонтирован
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
