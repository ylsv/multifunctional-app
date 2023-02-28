import React, {FC} from 'react'
import {LoginFormProps} from './LoginForm'

// export const LoginFormAsync = React.lazy(() => import('./LoginForm'));

export const LoginFormAsync = React.lazy<FC<LoginFormProps>>(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./LoginForm')), 1500)
}))

