import React, {Suspense, useEffect} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {AppRouter} from './providers/router'
import {Navbar} from '@/widgets/Navbar'
import {Sidebar} from '@/widgets/Sidebar'
import {useSelector} from 'react-redux'
import {getUserInitialized} from '@/entities/User'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {initAuthData} from '@/entities/User'
import {PageLoader} from '@/widgets/PageLoader'

const App = () => {
  const dispatch = useAppDispatch()
  const userInitialized = useSelector(getUserInitialized)

  useEffect(() => {
    dispatch(initAuthData())
  }, [dispatch])

  if (!userInitialized) return <PageLoader />

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar/>
        <div className="content-page">
          <Sidebar/>
          {userInitialized && <AppRouter/>}
        </div>
      </Suspense>
    </div>
  )
}

export default App
