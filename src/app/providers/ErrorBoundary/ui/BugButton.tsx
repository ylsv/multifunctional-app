import {useEffect, useState} from 'react'
import {Button} from '@/shared/ui/Button'
import {useTranslation} from 'react-i18next'

// Тестовый компонент для проверки работы ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false)
  const {t} = useTranslation()

  useEffect(() => {
    if(error) throw new Error()
  }, [error])

  const throwError = () => setError(true)

  return (
    <Button onClick={throwError}>
      {t('Создать ошибку')}
    </Button>
  )
}
