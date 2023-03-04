import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import {useSelector} from 'react-redux'
import {getProfileData} from '../../model/selectors/getProfileData/getProfileData'
import {getProfileIsLoading} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import {getProfileError} from '../../model/selectors/getProfileError/getProfileError'
import {useTranslation} from 'react-i18next'
import {Text} from 'shared/ui/Text/Text'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({className}: ProfileCardProps) => {
  const {t} = useTranslation('profile')
  const data = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')}/>
        <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={data?.firstname}
          placeholder={t('Ваше имя')}
          className={cls.input}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
        />
      </div>
    </div>
  )
}
