import React, {Suspense, useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import {AppRouter} from 'app/providers/router'
import {Navbar} from 'widgets/Navbar'
import {Sidebar} from 'widgets/Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import {getUserInitialized, userActions} from 'entities/User'

const App = () => {
  const dispatch = useDispatch()
  const userInitialized = useSelector(getUserInitialized)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

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
