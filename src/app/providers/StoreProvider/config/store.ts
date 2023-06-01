import {CombinedState, configureStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import {$api} from '@/shared/api/api'
import {StateSchema, ThunkExtraArg} from './StateSchema'
import {userReducer} from '@/entities/User'
import {createReducerManager} from './reducerManager'
import {uiReducer} from '@/features/UI'
import {rtkApi} from '@/shared/api/rtkApi'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    ...asyncReducers,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      }
    }).concat(rtkApi.middleware),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
