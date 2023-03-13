import cls from './SidebarItem.module.scss'
import {RoutePath} from 'shared/config/routeConfig/routeConfig'
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {SidebarItemType} from '../../model/items'
import {classNames} from 'shared/lib/classNames/classNames'
import {useSelector} from 'react-redux'
import {getUserAuthData} from 'entities/User'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = ({item, collapsed}: SidebarItemProps) => {
  const {t} = useTranslation('sidebar')
  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) return null

  return (
    <AppLink
      to={item.path}
      theme={AppLinkTheme.SECONDARY}
      className={classNames(cls.item, {[cls.collapsed]: collapsed})}
    >
      <item.Icon className={cls.icon}/>
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  )
}
