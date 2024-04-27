import { createContext } from 'react'
import { Team, TeamsCollection } from '../../models'

export interface INBAContext {
    teams: TeamsCollection
    defaultTeam: Team | null
}

export const NBAContext = createContext<INBAContext | null>(null)