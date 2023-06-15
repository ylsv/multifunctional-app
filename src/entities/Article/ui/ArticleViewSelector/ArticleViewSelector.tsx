import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './ArticleViewSelector.module.scss'
import {ArticleView} from '../../model/types/article'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import {Button, ButtonTheme} from '@/shared/ui/Button'
import {Icon} from '@/shared/ui/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {view: ArticleView.SMALL, icon: TiledIcon},
  {view: ArticleView.BIG, icon: ListIcon},
]

export const ArticleViewSelector = memo(({className, view, onViewClick}: ArticleViewSelectorProps) => {

  const handleButtonClick = (newView: ArticleView) => () => {
    if (onViewClick) {
      onViewClick(newView)
    }
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((type, i) => (
        <Button
          key={i}
          theme={ButtonTheme.CLEAR}
          onClick={handleButtonClick(type.view)}
        >
          <Icon
            Svg={type.icon}
            className={classNames('', {[cls.notSelected]: type.view !== view})}
          />
        </Button>
      ))}
    </div>
  )
})

