import './ThemeProvider.css'
import { useEffect, useState } from 'react'
import Theme from './theme'
import { IThemeContext, ThemeContext } from './themeContext'

interface ThemeProviderProps {
    children?: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme as Theme ?? 'light'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const defaultValue: IThemeContext = {
        theme: theme,
        setTheme: setTheme
    }

    return (
        <ThemeContext.Provider value={defaultValue}>
            <div className={`theme-provider ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider