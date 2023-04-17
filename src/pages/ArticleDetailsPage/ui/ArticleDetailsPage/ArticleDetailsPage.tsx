import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo, useCallback} from 'react'
import {ArticleDetails, ArticleList} from 'entities/Article'
import {useParams} from 'react-router-dom'
import {CommentList} from 'entities/Comment'
import {Text, TextSize} from 'shared/ui/Text/Text'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {getArticleComments} from '../../model/slice/ArticleDetailsCommentsSlice'
import {useSelector} from 'react-redux'
import {getArticleCommentsIsLoading} from '../../model/selectors/comments'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {fetchCommentsByArticleId} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {AddCommentForm} from 'features/AddCommentForm'
import {addCommentForArticle} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {Page} from 'widgets/Page/Page'
import {getArticleRecommendations} from '../../model/slice/ArticleDetailsRecommendationsSlice'
import {getArticleRecommendationsIsLoading} from '../../model/selectors/recommendations'
import {
  fetchArticlesRecommendations
} from '../../model/services/fetchArticlesRecommendations/fetchArticlesRecommendations'
import {articleDetailsPageReducer} from '../../model/slice'
import {ArticleDetailsPageHeader} from 'pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const commentsAreLoading = useSelector(getArticleCommentsIsLoading)
  const recommendationsAreLoading = useSelector(getArticleRecommendationsIsLoading)
  const dispatch = useAppDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticlesRecommendations())
  })

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
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id}/>
        <Text title={t('Рекомендации')} className={cls.commentTitle} size={TextSize.L}/>
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsAreLoading}
          className={cls.recommendations}
          target="_blank"
        />
        <Text title={t('Комментарии')} className={cls.commentTitle} size={TextSize.L}/>
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList
          comments={comments}
          isLoading={commentsAreLoading}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
