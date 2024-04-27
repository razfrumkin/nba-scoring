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

export function calculateAverages(games: GamesCollection<'team'>): { teamId: TeamId, average: number }[] {
    const averages: { [teamId: TeamId]: number } = {}

    for (const teamId in games) {
        const id = parseInt(teamId)
        averages[id] = 0
        
        for (const game of games[teamId]) {
            averages[id] += id === game.winnerId ? game.winnerPoints : game.loserPoints
        }

        const length = games[teamId].length
        if (length > 0) averages[id] /= length
    }

    return Object.keys(averages).map(teamId => {
        const id = parseInt(teamId)
        return { teamId: id, average: averages[id] }
    }).sort((left, right) => right.average - left.average)
}

export function calculateOffenseDefenseAverages(games: GamesCollection<'team'>): { teamId: TeamId, offense: number, defense: number }[] {
    const averages: { [teamId: TeamId]: { offense: number, defense: number } } = {}

    for (const teamId in games) {
        const id = parseInt(teamId)
        averages[id] = { offense: 0, defense: 0 }

        for (const game of games[teamId]) {
            averages[id].offense += id === game.winnerId ? game.winnerPoints : game.loserPoints
            averages[id].defense += id === game.winnerId ? game.loserPoints : game.winnerPoints
        }

        const length = games[teamId].length
        if (length > 0) {
            averages[id].offense /= length
            averages[id].defense /= length
        }
    }

    return Object.keys(averages).map(teamId => {
        const id = parseInt(teamId)
        return { teamId: id, offense: averages[id].offense, defense: averages[id].defense }
    })
}

export function calculateTotalPointsOccurences(games: GamesCollection<'none'>): { totalPoints: number, games: GamesCollection<'none'> }[] {
    const occurences: { [totalPoints: number]: GamesCollection<'none'> } = {}

    for (const game of games) {
        const totalPoints = game.winnerPoints + game.loserPoints
        if (totalPoints in occurences) occurences[totalPoints].push(game)
        else occurences[totalPoints] = [game]
    }

    return Object.keys(occurences).map(totalPoints => {
        const points = parseInt(totalPoints)
        return { totalPoints: points, games: occurences[points] }
    })
}

const ONE_POSSESION_GAME_LEAD = 3
const BLOWOUT_LEAD = 20

export function calculateLeads(games: GamesCollection<'none'>): { onePossessionGames: number, moderateLeads: number, blowouts: number } {
    let small = 0
    let medium = 0
    let big = 0

    for (const game of games) {
        const difference = game.winnerPoints - game.loserPoints
        if (difference <= ONE_POSSESION_GAME_LEAD) small += 1
        else if (difference < BLOWOUT_LEAD) medium += 1
        else big += 1
    }

    return { onePossessionGames: small, moderateLeads: medium, blowouts: big }
}