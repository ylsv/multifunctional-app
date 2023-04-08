import {MutableRefObject, useEffect, useRef} from 'react'

export interface UseInfiniteScrollOptions {
  cb?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({cb, wrapperRef, triggerRef}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    if (cb) {
      const options = {
        root: wrapperElement,
        rootMargin: '20px 20px 20px 45px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          cb()
        }
      }, options)

      observer.current.observe(triggerElement)
    }

    return () => {
      if (observer.current && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(triggerElement)
      }
    }
  }, [cb, triggerRef, wrapperRef])
}
