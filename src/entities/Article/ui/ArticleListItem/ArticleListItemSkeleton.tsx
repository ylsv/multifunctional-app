import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import {ArticleView} from '../../model/types/article'
import {Card} from '@/shared/ui/Card'
import {Skeleton} from '@/shared/ui/Skeleton'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSkeleton = memo(({className, view}: ArticleListItemSkeletonProps) => {
  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Skeleton width={30} height={30} borderRadius={'50%'}/>
            <Skeleton width={150} height={16} className={cls.username}/>
            <Skeleton width={150} height={16} className={cls.date}/>
          </div>
          <Skeleton width={250} height={24} className={cls.title}/>
          <Skeleton width={'100%'} height={100} className={cls.img}/>
          <div className={cls.footer}>
            <Skeleton width={200} height={50} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.img}/>
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16}/>
        </div>
        <Skeleton width={160} height={16} className={cls.title}/>
      </Card>
    </div>
  )
})
