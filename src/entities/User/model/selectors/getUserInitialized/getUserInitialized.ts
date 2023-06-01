import {StateSchema} from '@/app/providers/StoreProvider'

export const getUserInitialized = (state: StateSchema) => state.user._initialized
