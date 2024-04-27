import { Game, TeamId } from '../models'

export function calculateStreaks(teamId: TeamId, games: Game[]): { streak: number, game: Game }[] {
    let streak = 0
    const streaks: { streak: number, game: Game }[] = []

    for (let index = 0; index < games.length; index += 1) {
        const game = games[index]

        if (teamId === game.winnerId) {
            if (streak < 0) streak = 1
            else streak += 1
        } else {
            if (streak > 0) streak = -1
            else streak -= 1
        }

        streaks.push({ streak: streak, game: game })
    }

    return streaks
}