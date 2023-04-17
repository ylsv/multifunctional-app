import React from 'react'

// export const ArticleEditPageAsync = React.lazy(() => import('./ArticleEditPage'));

export const ArticleEditPageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticleEditPage')), 500)
}))

