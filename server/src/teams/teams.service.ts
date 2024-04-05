import { Injectable } from '@nestjs/common'
import { Team, TeamId, TeamsCollection, TeamsSerializer } from '../models/team'
import { PostgresService } from '../postgres/postgres.service'

@Injectable()
export class TeamsService {
    constructor(private readonly postgresService: PostgresService) {}

    async searchTeams(prompt: string): Promise<TeamsCollection> {
        const data = await this.postgresService.query(`
            SELECT * FROM teams
            WHERE abbreviation ILIKE $1
            OR full_name ILIKE $1
            OR nickname ILIKE $1
            OR city ILIKE $1
        `, `%${prompt}%`)
        return TeamsSerializer.serializeTeams(data)
    }

    async getTeamById(teamId: TeamId): Promise<Team> {
        const data = await this.postgresService.query('SELECT * FROM teams WHERE id = $1', teamId)
        return TeamsSerializer.serializeTeam(data[0])
    }

    async getAllTeams(): Promise<TeamsCollection> {
        const data = await this.postgresService.query('SELECT * FROM teams')
        return TeamsSerializer.serializeTeams(data)
    }
}