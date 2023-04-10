import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {memo, useCallback} from 'react'
import {ArticleList, ArticleView, ArticleViewSelector} from 'entities/Article'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articlesPageActions, articlesPageReducer, getArticles} from '../../model/slice/articlesPageSlice'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList'
import {useSelector} from 'react-redux'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNumber,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import {Page} from 'widgets/Page/Page'
import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage'

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
  const hasMore = useSelector(getArticlesPageHasMore)
  const curPage = useSelector(getArticlesPageNumber)
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(curPage + 1))
      dispatch(fetchArticlesList({page: curPage + 1}))
    }
  }, [curPage, dispatch, hasMore, isLoading])

  useInitialEffect(() => {
    dispatch(initArticlesPage())
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView}/>
        <ArticleList
          view={view}
          isLoading={isLoading}
          articles={articles}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
