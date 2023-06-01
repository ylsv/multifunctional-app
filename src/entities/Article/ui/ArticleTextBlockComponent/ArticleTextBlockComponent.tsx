import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import {useTranslation} from 'react-i18next'
import {ArticleTextBlock} from '../../model/types/article'
import {Text} from '@/shared/ui/Text/Text'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = ({className, block}: ArticleTextBlockComponentProps) => {
  const {t} = useTranslation()
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <Text title={block.title} className={cls.title} />
      )}
      {block.paragraphs.map((p, i) => (
        <Text key={i} text={p} className={cls.paragraph} />
      ))}
    </div>
  )
}
