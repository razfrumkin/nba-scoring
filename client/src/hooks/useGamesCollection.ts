import { useQuery } from 'react-query'
import { GamesCollection, SeasonOption, SortOption, TeamOption } from '../models'
import { fetchGames } from '../api'

interface UseGamesCollectionReturnType<T extends SortOption> {
    isLoading: boolean
    games?: GamesCollection<T>
}

const useGamesCollection = <T extends SortOption>(team: TeamOption, season: SeasonOption, sort: T): UseGamesCollectionReturnType<T> => {
    const results = useQuery({ queryKey: [`team=${team}`, `season=${season}`, `sort=${sort}`], queryFn: async() => {
        return fetchGames(team, season, sort)
    }, refetchOnWindowFocus: false })

    return { isLoading: results.isLoading, games: results.data }
}

export default useGamesCollection