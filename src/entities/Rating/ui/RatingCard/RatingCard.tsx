import {memo, useCallback, useState} from 'react'
import cls from './RatingCard.module.scss'
import {classNames} from '@/shared/lib/classNames/classNames'
import {HStack, VStack} from '@/shared/ui/Stack'
import {Text} from '@/shared/ui/Text'
import {StarRating} from '@/shared/ui/StarRating'
import {Modal} from '@/shared/ui/Modal'
import {Input} from '@/shared/ui/Input'
import {useTranslation} from 'react-i18next'
import {Button, ButtonTheme} from '@/shared/ui/Button'
import {BrowserView, MobileView} from 'react-device-detect'
import {Drawer} from '@/shared/ui/Drawer'
import {Card} from '@/shared/ui/Card'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0
  } = props
  const {t} = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
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
        data-testid="RatingCard.Input"
      />
      <HStack max gap="16" justify="end">
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler} data-testid="RatingCard.Close">
          {t('Закрыть')}
        </Button>
        <Button onClick={acceptHandler} data-testid="RatingCard.Send">
          {t('Отправить')}
        </Button>
      </HStack>
    </VStack>
  )

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])} data-testid="RatingCard">
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('Спасибо за оценку') : title}/>
        <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount}/>
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
    </Card>
  )
})
