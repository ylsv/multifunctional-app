import {ChangeEvent, memo, useCallback, useMemo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
  const {className, label, value, onChange, options, readonly} = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
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
})
