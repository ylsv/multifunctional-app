import React from 'react'

// export const MainPageAsync = React.lazy(() => import('./MainPage'));

export const MainPageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./MainPage')), 1500)
}))

