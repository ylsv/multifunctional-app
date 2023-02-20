import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import {ButtonHTMLAttributes, FC} from 'react'

// типы кнопок (можно будет добавлять новые) стили для них по классам в файле стилей
export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

// добавляем пропсы html кнопки, чтобы были все онклики и прочее
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
  const {className, children, theme, square, size = ButtonSize.M, ...otherProps} = props
  return (
    <button
      className={classNames(cls.Button, {[cls.square]: square}, [className, cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
