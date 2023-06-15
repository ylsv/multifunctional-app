import {Suspense} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Modal} from '@/shared/ui/Modal'
import {LoginFormAsync} from '../LoginForm/LoginForm.async'
import {Loader} from '@/shared/ui/Loader'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({className, isOpen, onClose}: LoginModalProps) => {
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync isOpen={isOpen} onSuccess={onClose} />
      </Suspense>
    </Modal>
  )
}
