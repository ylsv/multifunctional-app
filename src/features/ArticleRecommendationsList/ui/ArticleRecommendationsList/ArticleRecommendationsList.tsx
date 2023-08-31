import {classNames} from '@/shared/lib/classNames/classNames'
import {useTranslation} from 'react-i18next'
import {memo} from 'react'
import {Text, TextSize} from '@/shared/ui/Text'
import {ArticleList} from '@/entities/Article'
import {VStack} from '@/shared/ui/Stack'
import {useGetArticleRecommendationsListQuery} from '../../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const {className} = props
  const {t} = useTranslation()
  const {data: articleRecommendations, isLoading, error} = useGetArticleRecommendationsListQuery(3)
  if (isLoading || error || !articleRecommendations) return null
  return (
    <VStack
      gap="8"
      className={classNames('', {}, [className])}
    >
      <Text title={t('Рекомендации')} size={TextSize.L}/>
      <ArticleList
        articles={articleRecommendations}
        target="_blank"
        data-testid="ArticleRecommendationsList"
      />
    </VStack>
  )
})
