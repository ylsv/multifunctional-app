import React, {memo} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

export const Icon = memo(({className, Svg, inverted, ...otherProps}: IconProps) => {
  return (
    <Svg className={classNames(cls.Icon, {[cls.inverted]: inverted}, [className])} {...otherProps}/>
  )
})
