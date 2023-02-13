import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import {ThemeSwitcher} from 'shared/ui/ThemeSwitcher'
import {LangSwitcher} from 'shared/ui/LangSwitcher/LangSwitcher'
import {useTranslation} from 'react-i18next'
import {Button} from 'shared/ui/Button/Button'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => setCollapsed(prev => !prev)
  const {t} = useTranslation('translation')
  return (
    <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
      <Button onClick={onToggle}>{t('Переключить')}</Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang}/>
      </div>
    </div>
  )
}
