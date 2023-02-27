import React, {useCallback, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'
import {LoginModal} from 'features/AuthByUsername'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData, userActions} from 'entities/User'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  // обернули в useCallback, чтобы при передачи функции в качестве пропсов она не пересоздавалась и не приводила к лишним перерисовкам
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
    setIsAuthModal(false)
  }, [dispatch])

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t('Выйти')}
        </Button>
      </div>
    )
  }

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
