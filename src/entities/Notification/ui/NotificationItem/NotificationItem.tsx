import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './NotificationItem.module.scss'
import {Notification} from '../../model/types/notification'
import {Card, CardTheme} from '@/shared/ui/Card/Card'
import {Text} from '@/shared/ui/Text/Text'

interface NotificationItemProps {
  className?: string
  notification: Notification
}

export const NotificationItem = memo(({className, notification}: NotificationItemProps) => {
  const content = (
    <Card
      className={classNames(cls.NotificationItem, {}, [className])}
      theme={CardTheme.OUTLINED}
    >
      <Text
        title={notification.title}
        text={notification.description}
      />
    </Card>
  )

  if (notification.href) {
    return (
      <a href={notification.href} target="_blank" rel="noreferrer" className={cls.link}>
        {content}
      </a>
    )
  }

  return content
})
