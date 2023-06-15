import {RatingCard} from '@/entities/Rating'
import {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useGetArticleRatingQuery, useRateArticleMutation} from '../../api/articleRatingApi'
import {getUserAuthData} from '@/entities/User'
import {useSelector} from 'react-redux'
import {Skeleton} from '@/shared/ui/Skeleton'

interface ArticleRatingProps {
  className?: string
  articleId: string
}

export const ArticleRating = memo(({className, articleId}: ArticleRatingProps) => {
  const {t} = useTranslation('article')
  const userData = useSelector(getUserAuthData)
  const userId = userData?.id ?? ''
  const {data, isLoading} = useGetArticleRatingQuery({articleId, userId})
  const [rateArticleMutation] = useRateArticleMutation()


  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId,
        articleId,
        rate: starsCount,
        feedback,
      })
    } catch (e) {
      console.log(e)
    }
  }, [articleId, rateArticleMutation, userId])

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])

  if (isLoading) return <Skeleton width="100%" height={120}/>

  const rating = data?.[0]

  return (
    <RatingCard
      rate={rating?.rate}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Ваш отзыв поможет улучшить качество')}
      hasFeedback
      onAccept={onAccept}
      onCancel={onCancel}
    />
  )
})
