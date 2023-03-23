import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import {useTranslation} from 'react-i18next'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articleDetailsReducer} from '../../model/slice/articleDetailsSlice'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {memo, useEffect} from 'react'
import {fetchArticleById} from '../../model/services/fetchArticleById/fetchArticleById'
import {useSelector} from 'react-redux'
import {getArticleDetails} from '../../model/selectors/getArticleDetails'
import {Text, TextAlign} from 'shared/ui/Text/Text'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo(({className, id}: ArticleDetailsProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()
  const {data: article, isLoading, error} = useSelector(getArticleDetails) || {}

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <div>
        <Skeleton className={cls.avatar} borderRadius="50%" width={200} height={200} />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} height={200} />
        <Skeleton className={cls.skeleton} height={200} />
      </div>
    )
  } else if (error) {
    content = (
      <Text
        title={t('Произошла ошибка при загрузке статьи')}
        align={TextAlign.CENTER}
      />
    )
  } else {
    content = (
      <div>
        {t('ArticleDetails')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
