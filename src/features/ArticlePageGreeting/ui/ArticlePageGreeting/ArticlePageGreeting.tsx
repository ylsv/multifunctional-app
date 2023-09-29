import {useTranslation} from 'react-i18next'
import {memo, useEffect, useState} from 'react'
import {Modal} from '@/shared/ui/Modal'
import {Text, TextAlign} from '@/shared/ui/Text'
import {saveJsonSettings, useJsonSettings} from '@/entities/User'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {isMobile} from 'react-device-detect'
import {Drawer} from '@/shared/ui/Drawer'

export const ArticlePageGreeting = memo(() => {
  const {t} = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const {isFirstVisit} = useJsonSettings()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isFirstVisit) {
      setIsOpen(true)
      dispatch(saveJsonSettings({isFirstVisit: false}))
    }
  }, [dispatch, isFirstVisit])

  const modalContent = (
    <Text
      title={t('Добро пожаловать на сайт со статьями')}
      text={t('Здесь вы можете выбрать и прочитать статьи на различные темы')}
      align={TextAlign.CENTER}
    />
  )

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalContent}
      </Drawer>
    )
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {modalContent}
    </Modal>
  )
})
