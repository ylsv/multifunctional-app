import {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPageFilters.module.scss'
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleTypeTabs,
  ArticleView,
  ArticleViewSelector
} from '@/entities/Article'
import {articlesPageActions} from '../../model/slice/articlesPageSlice'
import {useSelector} from 'react-redux'
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {useTranslation} from 'react-i18next'
import {Card} from '@/shared/ui/Card/Card'
import {Input} from '@/shared/ui/Input/Input'
import {SortOrder} from '@/shared/types'
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList'
import {useDebounce} from '@/shared/lib/hooks/useDebounce/useDebounce'
import {ArticleType} from '@/entities/Article/model/types/article'

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo(({className}: ArticlesPageFiltersProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({replace: true}))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch= useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debouncedFetchData()
  }, [debouncedFetchData, dispatch])

  const onChangeType= useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeSort={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView}/>
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t('поиск')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  )
})
