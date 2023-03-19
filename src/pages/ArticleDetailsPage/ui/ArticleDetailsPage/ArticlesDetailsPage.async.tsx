import React from 'react'

// export const ArticleDetailsPageAsync = React.lazy(() => import('./ArticleDetailsPage'));

export const ArticleDetailsPageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500)
}))

