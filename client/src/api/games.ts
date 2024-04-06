import { GamesCollection, SeasonOption, SortOption, TeamOption } from '../models'

const URL = 'api/games'

export async function fetchGames<T extends SortOption>(team: TeamOption, season: SeasonOption, sort: T): Promise<GamesCollection<T>> {
    const response = await fetch(`${URL}?team=${team}&season=${season}&sort=${sort}`)
    return response.json()
}