import {ReactNode, useState} from 'react'
import {Listbox as HListBox} from '@headlessui/react'
import cls from './ListBox.module.scss'
import {classNames} from 'shared/lib/classNames/classNames'
import {Button} from '../Button/Button'
import {HStack} from '../Stack'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

type DropdownDirection = 'top' | 'bottom'

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
  const {className, items, value, defaultValue, onChange, readonly, direction = 'bottom', label} = props

  return (
    <HStack gap="8">
      {label && <span>{label}</span>}
      <HListBox
        className={classNames(cls.ListBox, {}, [className])}
        as="div"
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button className={cls.trigger} disabled={readonly}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, [cls[direction]])}>
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
                      [cls.active]: active,
                      [cls.disabled]: item.disabled,
                      [cls.selected]: selected,
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
