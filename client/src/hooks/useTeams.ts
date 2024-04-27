import { useContext } from 'react'
import { Team, TeamsCollection } from '../models'
import { NBAContext } from '../providers/nba/nbaContext'

interface UseTeamsReturnType {
    teams: TeamsCollection
    defaultTeam: Team
}

const useTeams = (): UseTeamsReturnType => {
    const context = useContext(NBAContext)
    if (context === null) throw new Error('useTeams must be within NBAProvider')

    return { teams: context.teams, defaultTeam: context.defaultTeam! }
}

export default useTeams