import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './CommentCard.module.scss'
import {Comment} from '../../model/types/comment'
import {Avatar} from '@/shared/ui/Avatar'
import {Text} from '@/shared/ui/Text'
import {Skeleton} from '@/shared/ui/Skeleton'
import {AppLink} from '@/shared/ui/AppLink'
import {RoutePath} from '@/shared/const/router'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = memo(({className, comment, isLoading}: CommentCardProps) => {

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} borderRadius={'50%'}/>
          <Skeleton width={100} height={16}/>
        </div>
        <Skeleton className={cls.text} width={'100%'} height={50}/>
      </div>
    )
  }

  if (!comment) return null

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar}/>}
        <Text title={comment.user.username}/>
      </AppLink>
      <Text className={cls.text} text={comment.text}/>
    </div>
  )
})
