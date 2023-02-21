import {StateSchema} from 'app/providers/StoreProvider'

// по умолчанию селектор работает с нетипизированным стейтом, поэтому применим типы стейт-схемы
export const getCounter = (state: StateSchema) => state.counter
