import React from 'react'

// export const ArticlesPageAsync = React.lazy(() => import('./ArticlesPage'));

export const ArticlesPageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticlesPage')), 1500)
}))

