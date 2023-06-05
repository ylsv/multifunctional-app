import {memo, useCallback, useState} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import {HStack, VStack} from '@/shared/ui/Stack'
import {Text} from '@/shared/ui/Text/Text'
import {StarRating} from '@/shared/ui/StarRating/StarRating'
import {Modal} from '@/shared/ui/Modal/Modal'
import {Input} from '@/shared/ui/Input/Input'
import {useTranslation} from 'react-i18next'
import {Button, ButtonTheme} from '@/shared/ui/Button/Button'
import {BrowserView, MobileView} from 'react-device-detect'
import {Drawer} from '@/shared/ui/Drawer/Drawer'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
  } = props
  const {t} = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    hasFeedback ? setIsModalOpen(true) : onAccept?.(selectedStarsCount)
  }, [hasFeedback, onAccept])

  const acceptHandler = () => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }

  const cancelHandler = () => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }

  const modalContent = (
    <VStack max gap="32">
      <Text title={feedbackTitle}/>
      <Input
        placeholder={t('Ваш отзыв')}
        value={feedback}
        onChange={setFeedback}
      />
      <HStack max gap="16" justify="end">
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler}>
          {t('Закрыть')}
        </Button>
        <Button onClick={acceptHandler}>
          {t('Отправить')}
        </Button>
      </HStack>
    </VStack>
  )

  return (
    <div className={classNames('', {}, [className])}>
      <VStack align="center" gap="8">
        <Text title={title}/>
        <StarRating size={40} onSelect={onSelectStars}/>
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy>
          {modalContent}
        </Drawer>
      </MobileView>

    </div>
  )
})
