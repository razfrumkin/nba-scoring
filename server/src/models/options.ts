import { SeasonId } from './season'
import { TeamId } from './team'

export type SeasonOption = SeasonId | 'all'
export type TeamOption = TeamId | 'all'
export type SortOption = 'season' | 'team' | 'none'