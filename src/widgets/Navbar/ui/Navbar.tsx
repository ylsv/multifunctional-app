import React, {useCallback, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {Modal} from 'shared/ui/Modal/Modal'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'
import {LoginModal} from 'features/AuthByUsername'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation('navbar')
  const [isAuthModal, setIsAuthModal] = useState(false)

  // обернули в useCallback, чтобы при передачи функции в качестве пропсов она не пересоздавалась и не приводила к лишним перерисовкам
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  },[])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  },[])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  )
}
