import React, {memo, useMemo, useState} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import {ThemeSwitcher} from '@/features/ThemeSwitcher'
import {LangSwitcher} from '@/shared/ui/LangSwitcher'
import {Button, ButtonSize, ButtonTheme} from '@/shared/ui/Button'
import {SidebarItem} from '../SidebarItem/SidebarItem'
import {useSelector} from 'react-redux'
import {getSidebarItems} from '../../model/selectors/getSidebarItems'
import {VStack} from '@/shared/ui/Stack'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => setCollapsed(prev => !prev)
  const sidebarItems = useSelector(getSidebarItems)
  const itemsList = useMemo(() => (
    sidebarItems.map((item) => (
      <SidebarItem
        item={item}
        collapsed={collapsed}
        key={item.path}
      />
    ))
  ), [collapsed, sidebarItems])

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <VStack
        className={cls.items}
        gap="16"
        role="navigation"
      >
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher/>
        <LangSwitcher className={cls.lang} short={collapsed}/>
      </div>
    </aside>
  )
})
