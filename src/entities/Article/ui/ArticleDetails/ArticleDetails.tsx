import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import {useTranslation} from 'react-i18next'
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {articleDetailsReducer} from '../../model/slice/articleDetailsSlice'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {memo, useCallback} from 'react'
import {fetchArticleById} from '../../model/services/fetchArticleById/fetchArticleById'
import {useSelector} from 'react-redux'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading
} from '../../model/selectors/getArticleDetails'
import {Text, TextAlign, TextSize} from '@/shared/ui/Text'
import {Skeleton} from '@/shared/ui/Skeleton'
import {Avatar} from '@/shared/ui/Avatar'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import {Icon} from '@/shared/ui/Icon'
import {ArticleBlock, ArticleBlockType} from '../../model/types/article'
import {ArticleCodeBlockComponent} from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import {ArticleImageBlockComponent} from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {ArticleTextBlockComponent} from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo(({className, id}: ArticleDetailsProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()
  const article = useSelector(getArticleDetailsData)
  const error = useSelector(getArticleDetailsError)
  const isLoading = useSelector(getArticleDetailsIsLoading)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent
        key={block.id} block={block}
        className={cls.block}
      />
    default:
      return null
    }
  }, [])

  useInitialEffect(() => {
    dispatch(fetchArticleById(id))
  })

  let content

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} borderRadius="50%" width={200} height={200}/>
        <Skeleton className={cls.title} width={300} height={32}/>
        <Skeleton className={cls.skeleton} width={600} height={24}/>
        <Skeleton className={cls.skeleton} height={200}/>
        <Skeleton className={cls.skeleton} height={200}/>
      </>
    )
  } else if (error) {
    content = (
      <Text
        title={t('Произошла ошибка при загрузке статьи')}
        align={TextAlign.CENTER}
      />
    )
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar}/>
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleInfo} data-testid="ArticleDetails.Info">
          <Icon Svg={EyeIcon} className={cls.icon}/>
          <Text text={String(article?.views)}/>
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon}/>
          <Text text={article?.createdAt}/>
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
})
