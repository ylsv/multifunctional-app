import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import {InputHTMLAttributes, memo} from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (val: string) => void
  autoFocus?: boolean
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        className={cls.input}
        {...otherProps}
      />
    </div>
  )
})
