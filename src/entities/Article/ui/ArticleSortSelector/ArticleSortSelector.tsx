import {memo, useCallback, useMemo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import {Select, SelectOption} from 'shared/ui/Select/Select'
import {useTranslation} from 'react-i18next'
import {ArticleSortField} from 'entities/Article'
import {SortOrder} from 'shared/types'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeSort: (newSort: ArticleSortField) => void
  onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {className, sort, order, onChangeOrder, onChangeSort} = props
  const {t} = useTranslation('article')

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {value: 'asc', content: t('возрастанию')},
    {value: 'desc', content: t('убыванию')},
  ], [t])

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {value: ArticleSortField.CREATED, content: t('дате создания')},
    {value: ArticleSortField.TITLE, content: t('названию')},
    {value: ArticleSortField.VIEWS, content: t('просмотрам')},
  ], [t])

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        options={orderOptions}
        label={t('Сортировать по')}
        value={order}
        onChange={onChangeOrder}
      />
      <Select
        options={sortFieldOptions}
        label={t('Сортировать по')}
        value={sort}
        onChange={onChangeSort}
      />
    </div>
  )
})
