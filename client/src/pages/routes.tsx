import CloseGamesSharesPage from './CloseGamesSharesPage'
import MainPage from './MainPage'
import OffenseDefensePage from './OffenseDefensePage'
import PointDifferentialsPage from './PointDifferentialsPage'
import ScoresHeatMapPage from './ScoresHeatMapPage'
import SeasonScoresPage from './SeasonScoresPage'
import StreaksPage from './StreaksPage'
import TeamsAveragesPage from './TeamsAveragesPage'
import TotalPointsOccurencesPage from './TotalPointsOccurencesPage'

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
        location: '/total-points-occurences',
        label: 'Total Points Occurences',
        element: <TotalPointsOccurencesPage/>
    },
    {
        location: '/close-games-shares',
        label: 'Close Games Shares',
        element: <CloseGamesSharesPage/>
    },
    {
        location: '/scores-heat-map',
        label: 'Scores Heat Map',
        element: <ScoresHeatMapPage/>
    },
    {
        location: '*',
        element: <span>Page Not Found</span>
    }
] as const

export default ROUTES