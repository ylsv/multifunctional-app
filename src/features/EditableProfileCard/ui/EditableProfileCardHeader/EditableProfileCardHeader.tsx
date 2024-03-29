import {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {getUserAuthData} from '@/entities/User'
import {HStack} from '@/shared/ui/Stack'
import {Text} from '@/shared/ui/Text'
import {Button, ButtonTheme} from '@/shared/ui/Button'
import {getProfileReadonly} from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import {profileActions} from '../../model/slice/profileSlice'
import {updateProfileData} from '../../model/services/updateProfileData/updateProfileData'
import {getProfileData} from '../../model/selectors/getProfileData/getProfileData'

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = memo(({className}: EditableProfileCardHeaderProps) => {
  const {t} = useTranslation('profile')
  const isReadOnly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])
  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Text title={t('Профиль')}/>
      {canEdit && (
        <div>
          {isReadOnly ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t('Отменить')}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t('Сохранить')}
              </Button>
            </HStack>
          )}
        </div>
      )}
    </HStack>
  )
})
