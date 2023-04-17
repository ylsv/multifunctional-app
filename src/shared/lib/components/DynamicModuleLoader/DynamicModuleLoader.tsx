import {FC, ReactElement, useEffect} from 'react'
import {useDispatch, useStore} from 'react-redux'
import {ReduxStoreWithManager, StateSchema} from 'app/providers/StoreProvider'
import {StateSchemaKey} from 'app/providers/StoreProvider/config/StateSchema'
import {Reducer} from '@reduxjs/toolkit'

// на случай, если несколько редусеров добавляется, передаем их список
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

type ReducersListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  children: ReactElement
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props: DynamicModuleLoaderProps) => {
  const {children, reducers, removeAfterUnmount = true} = props
  const store = useStore() as ReduxStoreWithManager
  const dispatch = useDispatch()

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers()

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey]

      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer)
        dispatch({type: `@INIT ${name} reducer`})
      }
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({type: `@DESTROY ${name} reducer`})
        })
      }
    }
    // eslint-disable-next-line
  }, [])

  return children
}
