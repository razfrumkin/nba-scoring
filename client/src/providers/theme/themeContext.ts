import { createContext } from 'react'
import Theme from './theme'

export interface IThemeContext {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<IThemeContext | null>(null)