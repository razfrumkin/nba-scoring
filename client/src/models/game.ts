import { SeasonId } from './season'
import { TeamId } from './team'

export type GameId = string

export type Game = {
    id: GameId
    winnerId: TeamId
    loserId: TeamId
    winnerPoints: number
    loserPoints: number
    winnerMatchup: string
    loserMatchup: string
    seasonId: SeasonId
    date: string
}