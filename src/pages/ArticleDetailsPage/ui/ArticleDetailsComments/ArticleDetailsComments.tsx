import {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Text, TextSize} from '@/shared/ui/Text/Text'
import {AddCommentForm} from '@/features/AddCommentForm'
import {CommentList} from '@/entities/Comment'
import {useSelector} from 'react-redux'
import {getArticleCommentsIsLoading} from '../../model/selectors/comments'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {addCommentForArticle} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {getArticleComments} from '../../model/slice/ArticleDetailsCommentsSlice'
import {useTranslation} from 'react-i18next'
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import {fetchCommentsByArticleId} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments = memo(({className, id}: ArticleDetailsCommentsProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsAreLoading = useSelector(getArticleCommentsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  return (
    <div className={classNames('', {}, [className])}>
      <Text title={t('Комментарии')} size={TextSize.L}/>
      <AddCommentForm onSendComment={onSendComment}/>
      <CommentList
        comments={comments}
        isLoading={commentsAreLoading}
      />
    </div>
  )
})
