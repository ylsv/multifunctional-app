import React, {memo, useCallback, useState} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {Button, ButtonTheme} from '@/shared/ui/Button/Button'
import {useTranslation} from 'react-i18next'
import {LoginModal} from '@/features/AuthByUsername'
import {useSelector} from 'react-redux'
import {getUserAuthData} from '@/entities/User'
import {Text, TextTheme} from '@/shared/ui/Text/Text'
import {AppLink, AppLinkTheme} from '@/shared/ui/AppLink/AppLink'
import {HStack} from '@/shared/ui/Stack'
import {NotificationButton} from '@/features/NotificationButton'
import {AvatarDropdown} from '@/features/AvatarDropdown'
import {RoutePath} from '@/shared/const/router'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = memo(({className}: NavbarProps) => {
  const {t} = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  // обернули в useCallback, чтобы при передаче функции в качестве пропсов она не пересоздавалась и не приводила к лишним перерисовкам
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

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
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
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
