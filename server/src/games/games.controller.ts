import { Controller, Get, Query } from '@nestjs/common'
import { GamesService } from './games.service'
import { SeasonOption, SortOption, TeamOption } from '../models/options'
import { Game } from '../models/game'
import { GamesCollection } from '../models/collection'

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    async getGames(@Query('season') season: SeasonOption, @Query('team') team: TeamOption, @Query('sort') sort: SortOption): Promise<GamesCollection<any>> {
        return this.gamesService.getGames(season, team, sort)
    }

    @Get()
    async getScores(): Promise<Game[]> {
        return this.gamesService.getAllGames()
    }
}