import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostgresModule } from './postgres/postgres.module'
import { GamesModule } from './games/games.module'
import { TeamsModule } from './teams/teams.module'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PostgresModule.forRoot(),
        ServeStaticModule.forRoot({ rootPath: join(__dirname, '../../client/dist'), exclude: ['api/*'] }),
        TeamsModule,
        GamesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {}