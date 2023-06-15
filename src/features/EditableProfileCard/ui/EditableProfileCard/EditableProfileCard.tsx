import {classNames} from '@/shared/lib/classNames/classNames'
import {useTranslation} from 'react-i18next'
import {memo, useCallback} from 'react'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useSelector} from 'react-redux'
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import {Currency} from '@/entities/Currency'
import {Country} from '@/entities/Country'
import {Text, TextTheme} from '@/shared/ui/Text'
import {getProfileForm} from '../../model/selectors/getProfileForm/getProfileForm'
import {getProfileIsLoading} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import {getProfileError} from '../../model/selectors/getProfileError/getProfileError'
import {getProfileReadonly} from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import {getProfileValidateErrors} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import {fetchProfileData} from '../../model/services/fetchProfileData/fetchProfileData'
import {profileActions, profileReducer} from '../../model/slice/profileSlice'
import {ProfileCard} from '@/entities/Profile'
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {EditableProfileCardHeader} from '../EditableProfileCardHeader/EditableProfileCardHeader'
import {VStack} from '@/shared/ui/Stack'
import {ValidateProfileError} from '../../model/consts/consts'

interface EditableProfileCardProps {
  className?: string
  id?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const {className, id} = props
  const {t} = useTranslation('profile')
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const isReadOnly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

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
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap="8" max className={classNames('', {}, [className])}>
        <EditableProfileCardHeader />
        {validateErrors?.length && (
          validateErrors.map(err => (
            <Text
              theme={TextTheme.ERROR}
              key={err}
              text={validateErrorTranslations[err]}
              data-testid="EditableProfileCard.Error"
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
      </VStack>
    </DynamicModuleLoader>
  )
})
