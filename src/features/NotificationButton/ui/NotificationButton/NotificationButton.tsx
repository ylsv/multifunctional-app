import React, {memo, useCallback, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {Icon} from 'shared/ui/Icon/Icon'
import {NotificationList} from 'entities/Notification'
import {Popover} from 'shared/ui/Popups'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import {BrowserView, MobileView} from 'react-device-detect'
import {Drawer} from 'shared/ui/Drawer/Drawer'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(({className}: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenDrawer = useCallback(() => setIsOpen(true), [])
  const onCloseDrawer = useCallback(() => setIsOpen(false), [])
  const trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted/>
    </Button>
  )
  return (
    <>
      <BrowserView>
        <Popover
          trigger={trigger}
          direction="bottomLeft"
          className={classNames(cls.NotificationButton, {}, [className])}
        >
          <NotificationList className={cls.notifications}/>
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList/>
        </Drawer>
      </MobileView>
    </>
  )
})
