import React, {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Avatar} from '@/shared/ui/Avatar'
import {Dropdown} from '@/shared/ui/Popups'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData, isUserAdmin, isUserManager, userActions} from '@/entities/User'
import {getRouteAdmin, getRouteProfile} from '@/shared/const/router'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = memo(({className}: AvatarDropdownProps) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) return null

  return (
    <Dropdown
      items={[
        ...(isAdminPanelAvailable ?
          [{content: t('Админка'), href: getRouteAdmin()}] :
          []),
        {content: t('Профиль'), href: getRouteProfile(authData.id)},
        {content: t('Выйти'), onClick: onLogout},
      ]}
      trigger={<Avatar size={30} src={authData.avatar}/>}
      direction="bottomLeft"
      className={classNames('', {}, [className])}
    />
  )
})
