import {ReactNode} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import {useTheme} from 'app/providers/ThemeProvider'
import {Portal} from '../Portal/Portal'
import {Overlay} from '../Overlay/Overlay'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer = (props: DrawerProps) => {
  const {className, children, isOpen, onClose} = props
  const {theme} = useTheme()
  return (
    <Portal>
      <div className={classNames(cls.Drawer, {[cls.opened]: isOpen}, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
