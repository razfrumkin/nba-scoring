import { Game } from '../models'

export function scoringDifference(game: Game): number {
    return game.winnerPoints - game.loserPoints
}