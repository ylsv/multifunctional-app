import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'
import {Page} from '@/widgets/Page'

interface ForbiddenPageProps {
  className?: string
}

export const ForbiddenPage = memo(({}: ForbiddenPageProps) => {
  const {t} = useTranslation('')
  return (
    <Page>
      {t('У вас нет доступа к этой странице')}
    </Page>
  )
})
