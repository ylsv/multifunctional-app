import {ChangeEvent, useMemo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {className, label, value, onChange, options, readonly} = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value as T)
    }
  }

  const optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option
        value={opt.value}
        key={opt.value}
        className={cls.option}
      >
        {opt.content}
      </option>
    ))
  }, [options])

  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  )
}
