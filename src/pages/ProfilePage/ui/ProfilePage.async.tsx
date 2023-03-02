import React from 'react'

// export const ProfilePageAsync = React.lazy(() => import('./ProfilePage'));

export const ProfilePageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./ProfilePage')), 1500)
}))

