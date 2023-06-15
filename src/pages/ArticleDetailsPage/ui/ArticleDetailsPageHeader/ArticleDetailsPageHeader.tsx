import {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import {Button, ButtonTheme} from '@/shared/ui/Button'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {getArticleDetailsData} from '@/entities/Article'
import {getCanEditArticle} from '../../model/selectors/article'
import {RoutePath} from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(({className}: ArticleDetailsPageHeaderProps) => {
  const {t} = useTranslation('article')
  const navigate = useNavigate()
  const canEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [article?.id, navigate])

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onBackToList}
      >
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </div>
  )
})
