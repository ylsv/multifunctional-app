import {ReactNode} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import {useTheme} from 'app/providers/ThemeProvider'
import {Portal} from '../Portal/Portal'
import {Overlay} from '../Overlay/Overlay'
import {useModal} from 'shared/lib/hooks/useModal/useModal'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Drawer = (props: DrawerProps) => {
  const {className, children, isOpen, onClose, lazy} = props
  const {theme} = useTheme()
  const {close, isMounted} = useModal({isOpen, onClose})

  if (lazy && !isMounted) return null

  return (
    <Portal>
      <div className={classNames(cls.Drawer, {[cls.opened]: isOpen}, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
