import { useTheme } from '../hooks'

const MainPage = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <h1>Current theme: {theme}</h1>
            <span>Toggle theme</span>
            <input type="checkbox" checked={theme !== 'light'} onChange={() => toggleTheme()}/>
        </>
    )
}

export default MainPage