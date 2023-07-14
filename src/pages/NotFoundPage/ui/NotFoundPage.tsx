import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'
import {useTranslation} from 'react-i18next'
import {Page} from '@/widgets/Page'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({className}: NotFoundPageProps) => {
  const {t} = useTranslation()
  return (
    <Page
      className={classNames(cls.NotFoundPage, {}, [className])}
      data-testid="NotFoundPage"
    >
      {t('Страница не найдена')}
    </Page>
  )
}
