import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {memo, useCallback} from 'react'
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articlesPageReducer} from '../../model/slice/articlesPageSlice'
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {Page} from '@/widgets/Page'
import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage'
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters'
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import {useSearchParams} from 'react-router-dom'
import {ArticleInfiniteList} from '../ArticleInfiniteList/ArticleInfiniteList'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({className}: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNextArticlesPage())
    }
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticlesPageFilters />
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
