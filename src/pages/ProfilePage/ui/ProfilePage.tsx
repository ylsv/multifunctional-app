import {classNames} from 'shared/lib/classNames/classNames'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {fetchProfileData, ProfileCard, profileReducer} from 'entities/Profile'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useEffect} from 'react'

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [])}>
        <ProfileCard/>
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
