import {useCallback, useEffect, useState} from 'react'

interface UseModalProps {
  onClose?: () => void
  isOpen?: boolean
}

export function useModal({isOpen, onClose}: UseModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isOpen) setIsMounted(true)
  }, [isOpen])

  const close = useCallback(() => {
    if (onClose) onClose()
  }, [onClose])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }, [close])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown)
    }
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onKeyDown])

  return {
    isMounted,
    close,
  }
}
