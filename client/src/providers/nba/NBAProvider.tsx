import { INBAContext, NBAContext } from './nbaContext'
import { fetchTeams } from '../../api'
import { useQuery } from 'react-query'

const LOS_ANGELES_LAKERS_TEAM_ID = 1610612747 // default team

interface NBAProviderProps {
    children?: React.ReactNode
}

const NBAProvider: React.FC<NBAProviderProps> = ({ children }) => {
    const results = useQuery({ queryKey: ['teams'], queryFn: async() => {
        return fetchTeams('all')
    }, refetchOnWindowFocus: false })

    const teams = results.data ?? {}
    const defaultTeam = teams[LOS_ANGELES_LAKERS_TEAM_ID] ?? null

    const defaultValue: INBAContext = {
        teams: teams,
        defaultTeam: defaultTeam
    }

    return (
        <NBAContext.Provider value={defaultValue}>
            {results.isLoading || defaultTeam === null ? <span>Loading...</span> : children}
        </NBAContext.Provider>
    )
}

export default NBAProvider