import {Currency} from '../../model/types/currency'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from '@/shared/ui/Select/Select.module.scss'
import {ListBox} from '@/shared/ui/Popups'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  {value: Currency.RUB, content: Currency.RUB},
  {value: Currency.EUR, content: Currency.EUR},
  {value: Currency.USD, content: Currency.USD},
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {className, value, onChange, readonly} = props
  const {t} = useTranslation('profile')
  const onChangeHandler = (value: string) => {
    if (onChange) onChange(value as Currency)
  }
  return (
    <ListBox
      className={classNames(cls.CurrencySelect, {}, [className])}
      onChange={onChangeHandler}
      value={value}
      defaultValue={t('Валюта')}
      label={t('Валюта')}
      items={options}
      readonly={readonly}
      direction={'topRight'}
    />
  )
})
