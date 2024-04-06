import { Game } from './game'
import { SortOption } from './options'
import { SeasonId } from './season'
import { TeamId } from './team'

export type GamesCollection<T extends SortOption> =
    T extends 'season' ? { [seasonId: SeasonId]: Game[] } :
    T extends 'team' ? { [teamId: TeamId]: Game[] } :
    T extends 'none' ? Game[] :
    never