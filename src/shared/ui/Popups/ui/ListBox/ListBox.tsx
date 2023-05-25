import {ReactNode} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss'
import {classNames} from 'shared/lib/classNames/classNames'
import {Button} from '../../../Button/Button'
import {HStack} from '../../../Stack'
import {DropdownDirection} from 'shared/types/ui'
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

export interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

export function ListBox(props: ListBoxProps) {
  const {className, items, value, defaultValue, onChange, readonly, direction = 'bottomRight', label} = props

  return (
    <HStack gap="8">
      {label && <span>{label}</span>}
      <HListBox
        className={classNames(popupCls.popup, {}, [className])}
        as="div"
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button className={popupCls.trigger} disabled={readonly}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, [popupCls.directionWrapper, popupCls[direction]])}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cls.item}
              as="div"
            >
              {({active, selected}) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled,
                      [popupCls.selected]: selected,
                    }
                  )}
                >
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
