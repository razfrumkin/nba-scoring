import { Injectable } from '@nestjs/common'
import { Game, GamesSerializer } from '../models/game'
import { PostgresService } from '../postgres/postgres.service'
import { SeasonOption, SortOption, TeamOption } from '../models/options'
import { GamesCollection } from '../models/collection'
import { TeamId } from '../models/team'
import { SeasonId } from '../models/season'

@Injectable()
export class GamesService {
    constructor(private readonly postgresService: PostgresService) {}

    async getGames(season: SeasonOption, team: TeamOption, sort: SortOption): Promise<GamesCollection<any>> {
        const games = this.getGamesBySeasonAndTeam(season, team)

        switch (sort) {
            case 'season':
                return this.sortGamesBySeason(await games)
            case 'team':
                return this.sortGamesByTeam(await games)
            default: return games
        }
    }

    async sortGamesBySeason(games: Game[]): Promise<GamesCollection<'season'>> {
        const collection: GamesCollection<'season'> = {}

        for (const game of games) {
            if (game.seasonId in collection) collection[game.seasonId].push(game)
            else collection[game.seasonId] = [game]
        }

        return collection
    }

    async sortGamesByTeam(games: Game[]): Promise<GamesCollection<'team'>> {
        const collection: GamesCollection<'team'> = {}

        for (const game of games) {
            if (game.winnerId in collection) collection[game.winnerId].push(game)
            else collection[game.seasonId] = [game]

            if (game.loserId in collection) collection[game.loserId].push(game)
            else collection[game.loserId] = [game]
        }

        return collection
    }

    async getGamesBySeasonAndTeam(season: SeasonOption, team: TeamOption): Promise<Game[]> {
        if (team !== 'all' && isNaN(Number(team))) return null

        if (season === 'all') {
            if (team === 'all') return this.getAllGames()

            return this.getGamesByTeam(Number(team))
        }

        if (team === 'all') return this.getGamesBySeason(season)

        return this.getGamesBySeasonAndTeamValidated(season, Number(team))
    }

    async getGamesByTeam(teamId: TeamId): Promise<Game[]> {
        const data = await this.postgresService.query('SELECT * FROM games WHERE winner_id = $1 OR loser_id = $1 ORDER BY datetime ASC', teamId)
        return GamesSerializer.serializeGames(data)
    }

    async getGamesBySeason(season: SeasonId): Promise<Game[]> {
        const data = await this.postgresService.query('SELECT * FROM games WHERE season_id = $1 ORDER BY datetime ASC', season)
        return GamesSerializer.serializeGames(data)
    }

    async getGamesBySeasonAndTeamValidated(season: SeasonId, teamId: TeamId): Promise<Game[]> {
        const data = await this.postgresService.query('SELECT * FROM games WHERE season_id = $1 AND (winner_id = $2 OR loser_id = $2) ORDER BY datetime ASC', season, teamId)
        return GamesSerializer.serializeGames(data)
    }

    async getAllGames(): Promise<Game[]> {
        return this.postgresService.query('SELECT * FROM games ORDER BY datetime ASC')
    }
}