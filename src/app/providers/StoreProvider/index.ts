import {createReduxStore, AppDispatch} from './config/store'
import {StoreProvider} from './ui/StoreProvider'
import type {StateSchema, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig, StateSchemaKey} from './config/StateSchema'

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ReduxStoreWithManager,
  ThunkExtraArg,
  ThunkConfig,
}

export type {
  AppDispatch,
  StateSchemaKey,
}
