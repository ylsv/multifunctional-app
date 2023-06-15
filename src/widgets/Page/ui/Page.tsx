import {MutableRefObject, ReactNode, useRef, UIEvent} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import {useInfiniteScroll} from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {getUIScrollByPath, uiActions} from '@/features/UI'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {StateSchema} from '@/app/providers/StoreProvider'
import {useInitialEffect} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import {useThrottle} from '@/shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = ({className, children, onScrollEnd}: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()
  const scrollPosition = useSelector(
    (state: StateSchema) => getUIScrollByPath(state, pathname)
  )

  useInfiniteScroll({
    cb: onScrollEnd,
    triggerRef,
    wrapperRef,
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname,
    }))
  }, 500)

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
    </main>
  )
}