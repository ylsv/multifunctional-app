import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {ArticleDetails} from '@/entities/Article'
import {useParams} from 'react-router-dom'
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {Page} from '@/widgets/Page'
import {articleDetailsPageReducer} from '../../model/slice'
import {ArticleDetailsPageHeader} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import {ArticleDetailsComments} from '../ArticleDetailsComments/ArticleDetailsComments'
import {ArticleRecommendationsList} from '@/features/ArticleRecommendationsList'
import {ArticleRating} from '@/features/ArticleRating'
import {toggleFeatures} from '@/shared/lib/features'
import {Card} from '@/shared/ui/Card'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
  const {t} = useTranslation('article')
  let {id} = useParams<{ id: string }>()
  if (__PROJECT__ === 'storybook') id = '1'

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  const articleRatingCard = toggleFeatures({
    name: 'isArticleRatingEnabled',
    on: () => <ArticleRating articleId={id || ''} />,
    off: () => <Card>{t('Оценка статей скоро появится!')}</Card>,
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader/>
        <ArticleDetails id={id}/>
        {articleRatingCard}
        <ArticleRecommendationsList/>
        <ArticleDetailsComments id={id}/>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
