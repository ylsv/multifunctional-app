import {CSSProperties, useMemo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import {AppImage} from '../AppImage'
import {Skeleton} from '../Skeleton'
import UserIcon from '../../assets/icons/user-filled.svg'
import {Icon} from '../Icon'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
}

export const Avatar = ({className, src, size = 100, alt}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size])

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
      fallBack={<Skeleton borderRadius="50%" width={size} height={size} />}
      errorFallBack={<Icon Svg={UserIcon} width={size} height={size} />}
    />
  )
}
