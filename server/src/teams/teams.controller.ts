import { Controller, Get, Param, Query } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { Team, TeamsCollection } from '../models/team'
import { TeamOption } from '../models/options'

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Get('search')
    async search(@Query('prompt') prompt: string): Promise<TeamsCollection> {
        return this.teamsService.searchTeams(prompt)
    }

    @Get(':team')
    async getTeamById(@Param('team') team: TeamOption): Promise<Team | TeamsCollection> {
        if (team === 'all') return this.teamsService.getAllTeams()

        const parsed = Number(team)
        if (isNaN(parsed)) return null

        return this.teamsService.getTeamById(parsed)
    }

    @Get()
    async getTeams(): Promise<TeamsCollection> {
        return this.teamsService.getAllTeams()
    }
}