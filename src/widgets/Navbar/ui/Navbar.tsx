import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink'

// тип для дополнительных пропсов, которые можно докидывать из вне Navbar
interface NavbarProps {
  className?: string
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to="/" className={cls.mainLink} theme={AppLinkTheme.SECONDARY}>Главная</AppLink>
        <AppLink to="/about" theme={AppLinkTheme.SECONDARY}>О сайте</AppLink>
      </div>
    </div>
  )
}
