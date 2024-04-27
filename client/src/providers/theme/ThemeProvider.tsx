import './ThemeProvider.scss'
import { useEffect, useState } from 'react'
import { IThemeContext, ThemeContext } from './themeContext'
import { Theme, ThemeType } from '../../models'

interface ThemeProviderProps {
    children?: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem('theme')
        return savedTheme as ThemeType ?? 'light'
    })

    const themes: { [name in ThemeType]: Theme } = {
        light: {
            backgroundColor: 'white',
            secondaryBackgroundColor: 'white',
            textColor: 'black',
            secondaryTextColor: 'black',
            placeholderTextColor: '#ececec'
        },
        dark: {
            backgroundColor: '#333333',
            secondaryBackgroundColor: '#212121',
            textColor: '#ffffff',
            secondaryTextColor: '#878787',
            placeholderTextColor: '#707070'
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)

        const style = document.documentElement.style
        const currentTheme = themes[theme]
        style.setProperty('--background-color', currentTheme.backgroundColor)
        style.setProperty('--secondary-background-color', currentTheme.secondaryBackgroundColor)
        style.setProperty('--text-color', currentTheme.textColor)
        style.setProperty('--secondary-text-color', 'currentTheme.secondaryTextColor')
        style.setProperty('--placeholder-text-color', currentTheme.placeholderTextColor)
    }, [theme])

    const defaultValue: IThemeContext = {
        themes: themes,
        theme: theme,
        setTheme: setTheme
    }

    return (
        <ThemeContext.Provider value={defaultValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider