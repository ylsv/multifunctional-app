import {classNames, Mods} from '@/shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import {ReactNode} from 'react'
import {Portal} from '../Portal/Portal'
import {Overlay} from '../Overlay/Overlay'
import {useModal} from '@/shared/lib/hooks/useModal/useModal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Modal = (props: ModalProps) => {
  const {className, children, isOpen, onClose, lazy} = props
  const {close, isMounted} = useModal({isOpen, onClose})

  if (lazy && !isMounted) return null

  const mods: Mods = {
    [cls.opened]: isOpen
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close}/>
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
