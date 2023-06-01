import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {useGetNotificationsQuery} from '../../api/notificationApi'
import {VStack} from '@/shared/ui/Stack'
import {NotificationItem} from '../NotificationItem/NotificationItem'
import {Skeleton} from '@/shared/ui/Skeleton/Skeleton'

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(({className}: NotificationListProps) => {
  const {data, isLoading} = useGetNotificationsQuery(null, {
    pollingInterval: 10000
  })

  if (isLoading) {
    return (
      <VStack
        gap="16"
        className={classNames('', {}, [className])}
      >
        <Skeleton width="100%" height="80px" borderRadius="8px" />
        <Skeleton width="100%" height="80px" borderRadius="8px" />
        <Skeleton width="100%" height="80px" borderRadius="8px" />
      </VStack>
    )
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames('', {}, [className])}
    >
      {data?.map(notification => <NotificationItem key={notification.id} notification={notification}/>)}
    </VStack>
  )
})
