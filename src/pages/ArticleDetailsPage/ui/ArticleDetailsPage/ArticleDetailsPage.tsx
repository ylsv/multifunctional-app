import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {ArticleDetails} from 'entities/Article'
import {useParams} from 'react-router-dom'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {Page} from 'widgets/Page/Page'
import {articleDetailsPageReducer} from '../../model/slice'
import {ArticleDetailsPageHeader} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import {ArticleDetailsComments} from '../ArticleDetailsComments/ArticleDetailsComments'
import {ArticleRecommendationsList} from 'features/ArticleRecommendationsList'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader/>
        <ArticleDetails id={id}/>
        <ArticleRecommendationsList/>
        <ArticleDetailsComments id={id}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
