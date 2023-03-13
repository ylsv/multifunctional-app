import {classNames, Mods} from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import {InputHTMLAttributes, memo} from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (val: string) => void
  autoFocus?: boolean
  readonly?: boolean
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    readonly,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  return (
    <div className={classNames(cls.inputWrapper, mods, [className])}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        className={cls.input}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  )
})
