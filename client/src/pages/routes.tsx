import MainPage from './MainPage'
import StreaksPage from './StreaksPage'

const ROUTES: { location: string, label?: string, element: JSX.Element }[] = [
    {
        location: '/',
        label: 'Main',
        element: <MainPage/>
    },
    {
        location: '/streaks',
        label: 'Streaks',
        element: <StreaksPage/>
    },
    {
        location: '*',
        element: <span>Page Not Found</span>
    }
] as const

export default ROUTES