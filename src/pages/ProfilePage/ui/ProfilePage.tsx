import {classNames} from 'shared/lib/classNames/classNames'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer, ValidateProfileError,
} from 'entities/Profile'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {ProfilePageHeader} from './ProfilePageHeader/ProfilePageHeader'
import {Currency} from 'entities/Currency'
import {Country} from 'entities/Country'
import {Text, TextTheme} from 'shared/ui/Text/Text'
import {useTranslation} from 'react-i18next'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useParams} from 'react-router-dom'
import {Page} from 'widgets/Page/Page'
import {VStack} from 'shared/ui/Stack'


const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadOnly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)
  let {id} = useParams<{ id: string }>()
  if (__PROJECT__ === 'storybook') id = '1'

  const {t} = useTranslation('profile')
  const validateErrorTranslations = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный  регион'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Не указаны имя или фамилия'),
    [ValidateProfileError.INCORRECT_AGE]: t('Неверный возраст'),
  }

  useInitialEffect(() => {
    id && dispatch(fetchProfileData(id))
  })

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
      <Page className={classNames('', {}, [])}>
        <ProfilePageHeader/>
        {validateErrors?.length && (
          validateErrors.map(err => (
            <Text
              theme={TextTheme.ERROR}
              key={err}
              text={validateErrorTranslations[err]}
            />
          ))
        )}
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
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
