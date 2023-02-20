import React, {useCallback, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {Modal} from 'shared/ui/Modal/Modal'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation('navbar')
  const [isAuthModal, setIsAuthModal] = useState(false)

  // обернули в useCallback, чтобы при передачи функции в качестве пропсов она не пересоздавалась и не приводила к лишним перерисовкам
  const onToggleModal = useCallback(() => {
    setIsAuthModal(prev => !prev)
  },[])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>111111111</Modal>
    </div>
  )
}
