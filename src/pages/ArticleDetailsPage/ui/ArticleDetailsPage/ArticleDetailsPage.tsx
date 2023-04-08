import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from 'react-i18next'
import {memo, useCallback} from 'react'
import {ArticleDetails} from 'entities/Article'
import {useNavigate, useParams} from 'react-router-dom'
import {CommentList} from 'entities/Comment'
import {Text} from 'shared/ui/Text/Text'
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articleDetailsCommentsReducer, getArticleComments} from '../../model/slice/ArticleDetailsCommentsSlice'
import {useSelector} from 'react-redux'
import {getArticleCommentsIsLoading} from '../../model/selectors/comments'
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import {fetchCommentsByArticleId} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {AddCommentForm} from 'features/AddCommentForm'
import {addCommentForArticle} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {RoutePath} from 'shared/config/routeConfig/routeConfig'
import {Page} from 'shared/ui/Page/Page'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = ({className}: ArticleDetailsPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsAreLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
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
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id}/>
        <Text title={t('Комментарии')} className={cls.commentTitle}/>
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
