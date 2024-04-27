import MainPage from './MainPage'
import OffenseDefensePage from './OffenseDefensePage'
import PointDifferentialsPage from './PointDifferentialsPage'
import SeasonScoresPage from './SeasonScoresPage'
import StreaksPage from './StreaksPage'
import TeamsAveragesPage from './TeamsAveragesPage'

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
        location: '/season-scores',
        label: 'Season Scores',
        element: <SeasonScoresPage/>
    },
    {
        location: '/point-differentials',
        label: 'Point Differentials',
        element: <PointDifferentialsPage/>
    },
    {
        location: '/teams-averages',
        label: 'Teams Averages',
        element: <TeamsAveragesPage/>
    },
    {
        location: '/offense-defense',
        label: 'Offense Defense',
        element: <OffenseDefensePage/>
    },
    {
        location: '*',
        element: <span>Page Not Found</span>
    }
] as const

export default ROUTES