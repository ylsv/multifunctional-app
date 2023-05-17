import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'
import {Page} from 'widgets/Page/Page'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = memo(({}: AdminPanelPageProps) => {
  const {t} = useTranslation('')
  return (
    <Page>
      {t('Панель администратора')}
    </Page>
  )
})

export default AdminPanelPage
