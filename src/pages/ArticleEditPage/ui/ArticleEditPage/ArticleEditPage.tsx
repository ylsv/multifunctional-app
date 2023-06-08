import {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {Page} from '@/widgets/Page'
import {useParams} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({className}: ArticleEditPageProps) => {
  const {t} = useTranslation()
  const {id} = useParams<{id: string}>()
  const isEdit = Boolean(id)
  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit ? t('Edit Page') : t('Create New Page')}
    </Page>
  )
})

export default ArticleEditPage
