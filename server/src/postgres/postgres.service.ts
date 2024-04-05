import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Client } from 'pg'

@Injectable()
export class PostgresService implements OnModuleDestroy {
    private client: Client

    constructor() {
        this.client = new Client({ database: 'postgres' })
        this.client.connect()
    }

    async query(sql: string, ...parameters: any[]): Promise<any[]> {
        const result = await this.client.query(sql, parameters)
        return result.rows
    }

    async onModuleDestroy() {
        this.client.end()
    }
}