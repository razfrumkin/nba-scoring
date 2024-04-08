import { useContext } from 'react'
import { Theme, ThemeContext } from '../providers/theme'

interface UseThemeReturnType {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
    toggleTheme: () => void
}

const useTheme = (): UseThemeReturnType => {
    const context = useContext(ThemeContext)
    if (context === null) throw new Error('useTheme must be within ThemeProvider')

    const toggleTheme = () => {
        context.setTheme(context.theme === 'light' ? 'dark' : 'light')
    }

    return { theme: context.theme, setTheme: context.setTheme, toggleTheme: toggleTheme }
}

export default useTheme