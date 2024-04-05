import { Global, Module } from '@nestjs/common'
import { PostgresService } from './postgres.service'

@Global()
@Module({
    providers: [PostgresService],
    exports: [PostgresService]
})
export class PostgresModule {
    static forRoot() {
        return {
            module: PostgresModule,
            providers: [PostgresService],
            exports: [PostgresService]
        }
    }
}