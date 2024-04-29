import { createContext } from 'react'
import { SeasonId, Team, TeamsCollection } from '../../models'

export interface INBAContext {
    teams: TeamsCollection
    defaultTeam: Team | null
    currentSeason: SeasonId
}

export const NBAContext = createContext<INBAContext | null>(null)