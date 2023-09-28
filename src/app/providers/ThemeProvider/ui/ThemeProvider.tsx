import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {ThemeContext} from '../../../../shared/lib/context/ThemeContext'
import {Theme} from '@/shared/const/theme'
import {useJsonSettings} from '@/entities/User'

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider = ({children, initialTheme}: ThemeProviderProps) => {
  const {theme: defaultTheme = Theme.LIGHT} = useJsonSettings()
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
  const [isThemeInited, setIsThemeInited] = useState(false)

  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme)
      setIsThemeInited(true)
    }
  }, [defaultTheme, isThemeInited])

  document.body.className = theme
  const defaultProps = useMemo(() => ({theme, setTheme}), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
