import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostgresModule } from './postgres/postgres.module'
import { GamesModule } from './games/games.module'
import { TeamsModule } from './teams/teams.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PostgresModule.forRoot(),
        TeamsModule,
        GamesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {}