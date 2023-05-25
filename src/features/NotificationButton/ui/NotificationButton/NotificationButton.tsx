import React, {memo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {Icon} from 'shared/ui/Icon/Icon'
import {NotificationList} from 'entities/Notification'
import {Popover} from 'shared/ui/Popups'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(({className}: NotificationButtonProps) => {
  return (
    <Popover
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon Svg={NotificationIcon} inverted/>
        </Button>
      )}
      direction="bottomLeft"
      className={classNames(cls.NotificationButton, {}, [className])}
    >
      <NotificationList className={cls.notifications}/>
    </Popover>
  )
})
