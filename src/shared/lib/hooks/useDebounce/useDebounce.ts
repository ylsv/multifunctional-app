import {MutableRefObject, useCallback, useRef} from 'react'

export function useDebounce(cb: (...args: any[]) => void, delay: number) {
  const timer = useRef() as MutableRefObject<any>

  return useCallback((...args: any[]) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      cb(...args)
    }, delay)
  }, [cb, delay])
}
