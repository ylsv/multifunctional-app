import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink'
import {useTranslation} from 'react-i18next'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation('navbar')
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to="/" className={cls.mainLink} theme={AppLinkTheme.SECONDARY}>
          {t('Главная')}
        </AppLink>
        <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>
          {t('О сайте')}
        </AppLink>
      </div>
    </div>
  )
}
