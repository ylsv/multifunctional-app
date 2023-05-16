import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import {useTranslation} from 'react-i18next'
import {Text, TextAlign, TextTheme} from 'shared/ui/Text/Text'
import {Input} from 'shared/ui/Input/Input'
import {Profile} from '../../model/types/profile'
import {Loader} from 'shared/ui/Loader/Loader'
import {Avatar} from 'shared/ui/Avatar/Avatar'
import {Currency, CurrencySelect} from 'entities/Currency'
import {Country} from 'entities/Country/model/types/country'
import {CountrySelect} from 'entities/Country'
import {VStack} from 'shared/ui/Stack'

interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstName?: (value: string) => void
  onChangeLastName?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (currency: Currency) => void
  onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props
  const {t} = useTranslation('profile')

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader/>
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
        />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ProfileCard, {[cls.editing]: !readonly}, [className])}>
      <VStack gap="4" max>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar}/>
          </div>
        )}
        <Input
          value={data?.firstname}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstName}
          readonly={readonly}
          data-testid="ProfileCard.FirstName"
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastName}
          readonly={readonly}
          data-testid="ProfileCard.LastName"
        />
        <Input
          value={data?.age}
          placeholder={t('Возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
          type="number"
        />
        <Input
          value={data?.city}
          placeholder={t('Город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </VStack>
    </div>
  )
}
