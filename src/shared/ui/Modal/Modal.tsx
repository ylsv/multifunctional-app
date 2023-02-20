import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import {ReactNode, useCallback, useEffect} from 'react'
import {Portal} from 'shared/ui/Portal/Portal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Modal = (props: ModalProps) => {
  const {className, children, isOpen, onClose} = props

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen
  }

  const closeHandler = useCallback(() => {
    if (onClose) onClose()
  }, [onClose])

  // чтобы не создавалась каждый раз без необходимости новая функция, используем useCallback
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeHandler()
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown)
    }
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onKeyDown])

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
