import {memo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import {Article, ArticleView} from '../../model/types/article'
import {ArticleListItem} from '../ArticleListItem/ArticleListItem'
import {ArticleListItemSkeleton} from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles?: Article[]
  isLoading?: boolean
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => <ArticleListItemSkeleton view={view} key={index}/>)
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {className, articles, view = ArticleView.SMALL, isLoading} = props

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem article={article} view={view} key={article.id}/>
    )
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles && articles.length > 0 ? (
        articles.map(renderArticle)
      ) : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
})
