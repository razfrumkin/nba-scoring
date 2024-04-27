import { useContext } from 'react'
import { Theme, ThemeContext, ThemeType } from '../providers/theme'

interface UseThemeReturnType {
    theme: ThemeType
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
    toggleTheme: () => void
    properties: Theme
}

const useTheme = (): UseThemeReturnType => {
    const context = useContext(ThemeContext)
    if (context === null) throw new Error('useTheme must be within ThemeProvider')

    const toggleTheme = () => {
        context.setTheme(context.theme === 'light' ? 'dark' : 'light')
    }

    return { theme: context.theme, setTheme: context.setTheme, toggleTheme: toggleTheme, properties: context.themes[context.theme] }
}

export default useTheme