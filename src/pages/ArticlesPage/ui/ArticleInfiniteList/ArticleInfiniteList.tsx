import {memo} from 'react'
import {ArticleList} from 'entities/Article'
import {useSelector} from 'react-redux'
import {getArticles} from '../../model/slice/articlesPageSlice'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import {useTranslation} from 'react-i18next'
import {Text} from 'shared/ui/Text/Text'

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = memo(({className}: ArticleInfiniteListProps) => {
  const {t} = useTranslation('article')
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')}/>
  }

  return (
    <ArticleList
      view={view}
      isLoading={isLoading}
      articles={articles}
      className={className}
    />
  )
})
