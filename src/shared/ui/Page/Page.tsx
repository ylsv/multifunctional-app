import {MutableRefObject, ReactNode, useRef} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import {useInfiniteScroll} from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = ({className, children, onScrollEnd}: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    cb: onScrollEnd,
    triggerRef,
    wrapperRef,
  })

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}/>
    </section>
  )
}
