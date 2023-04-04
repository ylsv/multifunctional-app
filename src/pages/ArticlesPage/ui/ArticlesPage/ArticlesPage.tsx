import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {Article, ArticleList, ArticleView} from 'entities/Article'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({className}: ArticlesPageProps) => {
  const {t} = useTranslation('article')
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        // view={ArticleView.BIG}
        isLoading
        articles={[]}/>
    </div>
  )
}

export default memo(ArticlesPage)
