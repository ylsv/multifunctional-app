import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {memo, useCallback} from 'react'
import {ArticleList} from 'entities/Article'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articlesPageReducer, getArticles} from '../../model/slice/articlesPageSlice'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useSelector} from 'react-redux'
import {getArticlesPageIsLoading, getArticlesPageView} from '../../model/selectors/articlesPageSelectors'
import {Page} from 'widgets/Page/Page'
import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage'
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters'
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import {useSearchParams} from 'react-router-dom'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({className}: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const [searchParams] = useSearchParams()
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticlesPageFilters />
        <ArticleList
          view={view}
          isLoading={isLoading}
          articles={articles}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
