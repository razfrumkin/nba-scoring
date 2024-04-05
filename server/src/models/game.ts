import { SeasonId } from './season'
import { TeamId } from './team'

export type GameId = string

export class Game {
    id: GameId
    winnerId: TeamId
    loserId: TeamId
    winnerPoints: number
    loserPoints: number
    winnerMatchup: string
    loserMatchup: string
    seasonId: SeasonId
    date: Date

    constructor(id: GameId, winnerId: TeamId, loserId: TeamId, winnerPoints: number, loserPoints: number, winnerMatchup: string, loserMatchup: string, seasonId: SeasonId, date: Date) {
        this.id = id
        this.winnerId = winnerId
        this.loserId = loserId
        this.winnerPoints = winnerPoints
        this.loserPoints = loserPoints
        this.winnerMatchup = winnerMatchup
        this.loserMatchup = loserMatchup
        this.seasonId = seasonId
        this.date = date
    }
}

export class GamesSerializer {
    static serializeGame(data: any): Game {
        return new Game(data['id'], data['winner_id'], data['loser_id'], data['winner_points'], data['loser_points'], data['winner_matchup'], data['loser_matchup'], data['season_id'], new Date(data['datetime']))
    }

    static async serializeGames(data: any[]): Promise<Game[]> {
        return data.map(raw => {
            return GamesSerializer.serializeGame(raw)
        })
    }
}