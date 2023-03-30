import React, {FC} from 'react'
import {AddCommentFormProps} from './AddCommentForm'

// export const LoginFormAsync = React.lazy(() => import('./LoginForm'));

export const AddCommentFormAsync = React.lazy<FC<AddCommentFormProps>>(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./AddCommentForm')), 1500)
}))

