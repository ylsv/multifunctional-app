import React from "react"

// export const AboutPageAsync = React.lazy(() => import('./AboutPage'));

export const AboutPageAsync = React.lazy(() => new Promise(resolve => {
  // промис поставили только на время обучения, чтобы продлить загрузку чанков и увидеть работу фолбэка в suspense
  // @ts-ignore
  setTimeout(() => resolve(import('./AboutPage')), 1500)
}))
