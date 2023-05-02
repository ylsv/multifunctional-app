import {Fragment, ReactNode} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import {Menu} from '@headlessui/react'
import {DropdownDirection} from 'shared/types/ui'
import {AppLink} from '../AppLink/AppLink'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

export function Dropdown(props: DropdownProps) {
  const {className, trigger, items, direction = 'bottomRight'} = props
  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, [cls[direction]])}>
        {items.map((item, i) => {
          const content = ({active}: { active: boolean }) => (
            <button
              type="button"
              className={classNames(cls.item, {[cls.active]: active}, [])}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item key={i} disabled={item.disabled} as={AppLink} to={item.href}>
                {content}
              </Menu.Item>
            )
          }
          return (
            <Menu.Item key={i} disabled={item.disabled} as={Fragment}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
