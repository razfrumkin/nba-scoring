import { useQuery } from 'react-query'
import { TeamsCollection } from '../models'
import { fetchTeams } from '../api'

interface UseTeamsReturnType {
    isLoading: boolean
    teams?: TeamsCollection
}

const useTeams = (): UseTeamsReturnType => {
    const results = useQuery({ queryKey: ['teams'], queryFn: async() => {
        return fetchTeams('all')
    }, refetchOnWindowFocus: false })

    return { isLoading: results.isLoading, teams: results.data }
}

export default useTeams