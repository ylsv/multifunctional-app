import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC} from 'react'

// типы кнопок (можно будет добавлять новые) стили для них по классам в файле стилей
export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline'
}

// добавляем пропсы html кнопки, чтобы были все онклики и прочее
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
  const {className, children, theme, ...otherProps} = props
  return (
    <button
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
