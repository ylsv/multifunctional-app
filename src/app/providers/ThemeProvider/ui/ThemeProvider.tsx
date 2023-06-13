import React, {ReactNode, useMemo, useState} from 'react'
import {ThemeContext} from '../../../../shared/lib/context/ThemeContext'
import {Theme} from '@/shared/const/theme'
import {LOCAL_STORAGE_THEME_KEY} from '@/shared/const/localStorage'

// берем из ls и приводим тип строки к типу theme
const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider = ({children, initialTheme}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
  document.body.className = theme
  // используем useMemo, чтобы не создавался каждый раз новый объект, а использовался один и тот же
  const defaultProps = useMemo(() => ({theme, setTheme}), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
