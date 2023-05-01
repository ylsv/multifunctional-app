import React, {memo, useCallback, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'
import {LoginModal} from 'features/AuthByUsername'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData, userActions} from 'entities/User'
import {Text, TextTheme} from 'shared/ui/Text/Text'
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink'
import {RoutePath} from 'shared/config/routeConfig/routeConfig'
import {Dropdown} from 'shared/ui/Dropdown/Dropdown'
import {Avatar} from 'shared/ui/Avatar/Avatar'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = memo(({className}: NavbarProps) => {
  const {t} = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  // обернули в useCallback, чтобы при передаче функции в качестве пропсов она не пересоздавалась и не приводила к лишним перерисовкам
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
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t('News App')}
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t('Создать статью')}
        </AppLink>
        <Dropdown
          className={cls.dropdown}
          items={[
            {content: t('Профиль'), href: RoutePath.profile + authData.id},
            {content: t('Выйти'), onClick: onLogout},
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction="bottomLeft"
        />
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
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
    </header>
  )
})
