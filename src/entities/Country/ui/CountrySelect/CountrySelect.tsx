import {Select} from 'shared/ui/Select/Select'
import {Country} from '../../model/types/country'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from 'shared/ui/Select/Select.module.scss'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options = [
  {value: Country.Russia, content: Country.Russia},
  {value: Country.Belarus, content: Country.Belarus},
  {value: Country.Armenia, content: Country.Armenia},
  {value: Country.Georgia, content: Country.Georgia},
  {value: Country.Kazakhstan, content: Country.Kazakhstan},
]

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {className, value, onChange, readonly} = props
  const {t} = useTranslation('profile')
  const onChangeHandler = (value: string) => {
    if (onChange) onChange(value as Country)
  }
  return (
    <Select
      className={classNames(cls.CountrySelect, {}, [className])}
      label={t('Страна')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})
