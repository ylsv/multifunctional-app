import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import {useTranslation} from 'react-i18next'
import {ArticleImageBlock} from '../../model/types/article'
import {Text, TextAlign} from '@/shared/ui/Text'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = ({className, block}: ArticleImageBlockComponentProps) => {
  const {t} = useTranslation()
  return (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  )
}
