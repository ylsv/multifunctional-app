import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
import {$api} from 'shared/api/api'
import {StateSchema} from './StateSchema'
import {counterReducer} from 'entities/Counter'
import {userReducer} from 'entities/User'
import {createReducerManager} from './reducerManager'
import {To, NavigateOptions} from 'react-router'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    ...asyncReducers,
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigate,
        }
      }
    }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
