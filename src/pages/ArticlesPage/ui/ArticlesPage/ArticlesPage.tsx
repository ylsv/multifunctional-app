import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo, useCallback} from 'react'
import {ArticleList, ArticleView, ArticleViewSelector} from 'entities/Article'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articlesPageActions, articlesPageReducer, getArticles} from '../../model/slice/articlesPageSlice'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList'
import {useSelector} from 'react-redux'
import {getArticlesPageIsLoading, getArticlesPageView} from '../../model/selectors/articlesPageSelectors'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({className}: ArticlesPageProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()
  useInitialEffect(() => {
    dispatch(fetchArticlesList())
    dispatch(articlesPageActions.initState())
  })
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView}/>
        <ArticleList
          view={view}
          isLoading={isLoading}
          articles={articles}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
