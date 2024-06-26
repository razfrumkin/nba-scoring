import { Navigate } from 'react-router-dom'
import { CloseGamesSharesPage, OffenseDefensePage, PointDifferentialsPage, ScoresHeatMapPage, SeasonScoresPage, StreaksPage, TeamsAveragesPage, TotalPointsOccurencesPage } from '../pages'

const ROUTES: { location: string, label?: string, element: JSX.Element }[] = [
    {
        location: '/',
        element: <Navigate to="/point-differentials" replace/>
    },
    {
        location: '/point-differentials',
        label: 'Point Differentials',
        element: <PointDifferentialsPage/>
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
        location: '/close-games-shares',
        label: 'Close Games Shares',
        element: <CloseGamesSharesPage/>
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
        location: '/scores-heat-map',
        label: 'Scores Heat Map',
        element: <ScoresHeatMapPage/>
    },
    {
        location: '*',
        element: <Navigate to="/" replace/>
    }
]

export default ROUTES