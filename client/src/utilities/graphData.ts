import { Game, GamesCollection, TeamId } from '../models'

export function calculateStreaks(teamId: TeamId, games: GamesCollection<'none'>): { streak: number, game: Game }[] {
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

export function calculateDifferentials(teamId: TeamId, games: GamesCollection<'none'>): { differential: number, game: Game }[] {
    const differentials: { differential: number, game: Game }[] = []

    for (const game of games) {
        const differential = teamId === game.winnerId ? game.winnerPoints - game.loserPoints : game.loserPoints - game.winnerPoints
        differentials.push({ differential: differential, game: game })
    }

    return differentials
}