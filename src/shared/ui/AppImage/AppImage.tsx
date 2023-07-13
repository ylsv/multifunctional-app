import {ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallBack?: ReactElement
  errorFallBack?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
  const {className, src, alt = 'image', fallBack, errorFallBack, ...otherProps} = props

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useLayoutEffect(() => {
    const img = new Image()
    img.src = src ?? ''
    img.onload = () => setIsLoading(false)
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
  }, [src])

  if (isLoading && fallBack) return fallBack
  if (hasError && errorFallBack) return errorFallBack

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...otherProps}
    />
  )
})
