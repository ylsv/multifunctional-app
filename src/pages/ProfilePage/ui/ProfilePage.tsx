import {classNames} from 'shared/lib/classNames/classNames'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  fetchProfileData,
  getProfileError, getProfileForm,
  getProfileIsLoading, getProfileReadonly, profileActions,
  ProfileCard,
  profileReducer,
} from 'entities/Profile'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ProfilePageHeader} from './ProfilePageHeader/ProfilePageHeader'
import {Currency} from 'entities/Currency'
import {Country} from 'entities/Country'


const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadOnly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstName = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({firstname: value}))
  }, [dispatch])

  const onChangeLastName = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({lastname: value}))
  }, [dispatch])

  const onChangeAge = useCallback((value: string) => {
    if (Number(value) > 120 || Number(value) < 1) return
    dispatch(profileActions.updateProfile({age: value}))
  }, [dispatch])

  const onChangeCity = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({city: value}))
  }, [dispatch])

  const onChangeUsername = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({username: value}))
  }, [dispatch])

  const onChangeAvatar = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({avatar: value}))
  }, [dispatch])

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({currency}))
  }, [dispatch])

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({country}))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [])}>
        <ProfilePageHeader/>
        <ProfileCard
          data={formData}
          error={error}
          isLoading={isLoading}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          readonly={isReadOnly}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
