import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'
import {Popover as HPopover} from '@headlessui/react'
import {ReactNode} from 'react'
import {DropdownDirection} from '@/shared/types/ui'

interface PopoverProps {
  className?: string
  trigger: ReactNode
  direction?: DropdownDirection
  children?: ReactNode
}

export const Popover = ({className, trigger, direction = 'bottomRight', children}: PopoverProps) => {
  return (
    <HPopover className={classNames(popupCls.popup, {}, [className])}>
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>
      <HPopover.Panel className={classNames(cls.panel, {}, [popupCls.directionWrapper, popupCls[direction]])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}
