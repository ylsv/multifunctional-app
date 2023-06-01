import React, {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon = memo(({className, Svg, inverted}: IconProps) => {
  return (
    <Svg className={classNames(cls.Icon, {[cls.inverted]: inverted}, [className])}/>
  )
})
