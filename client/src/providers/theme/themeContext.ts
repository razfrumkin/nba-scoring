import { createContext } from 'react'
import { Theme, ThemeType } from '../../models'

export interface IThemeContext {
    themes: { [name in ThemeType]: Theme }
    theme: ThemeType
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
}

export const ThemeContext = createContext<IThemeContext | null>(null)