import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {ArticleDetails} from 'entities/Article'
import {useParams} from 'react-router-dom'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }
  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id}/>
    </div>
  )
}

export default memo(ArticleDetailsPage)
