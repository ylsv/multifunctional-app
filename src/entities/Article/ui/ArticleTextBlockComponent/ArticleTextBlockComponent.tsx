import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import {ArticleTextBlock} from '../../model/types/article'
import {Text} from '@/shared/ui/Text'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = ({className, block}: ArticleTextBlockComponentProps) => {
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
