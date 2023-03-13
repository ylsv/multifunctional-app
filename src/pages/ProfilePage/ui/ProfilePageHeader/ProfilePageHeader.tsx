import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import {Text} from 'shared/ui/Text/Text'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {getProfileReadonly, profileActions, updateProfileData} from 'entities/Profile'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useCallback} from 'react'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({className}: ProfilePageHeaderProps) => {
  const {t} = useTranslation('profile')
  const isReadOnly = useSelector(getProfileReadonly)
  const dispatch = useAppDispatch()

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')}/>
      {isReadOnly ? (
        <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn} onClick={onEdit}>
          {t('Редактировать')}
        </Button>
      ) : (
        <>
          <Button theme={ButtonTheme.OUTLINE_RED} className={cls.editBtn} onClick={onCancelEdit}>
            {t('Отменить')}
          </Button>
          <Button theme={ButtonTheme.OUTLINE} className={cls.saveBtn} onClick={onSave}>
            {t('Сохранить')}
          </Button>
        </>
      )}
    </div>
  )
}
