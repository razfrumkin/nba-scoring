export type TeamId = number

export class Team {
    id: TeamId
    fullName: string
    abbreviation: string
    nickname: string
    city: string
    state: string
    colors: string[]

    constructor(id: TeamId, fullName: string, abbreviation: string, nickname: string, city: string, state: string, colors: string[]) {
        this.id = id
        this.fullName = fullName
        this.abbreviation = abbreviation
        this.nickname = nickname
        this.city = city
        this.state = state
        this.colors = colors
    }
}

export type TeamsCollection = { [teamId: TeamId]: Team }

export class TeamsSerializer {
    static serializeTeam(data: any): Team {
        return new Team(data['id'], data['full_name'], data['abbreviation'], data['nickname'], data['city'], data['state'], data['colors'])
    }

    static async serializeTeams(data: any[]): Promise<TeamsCollection> {
        const collection: TeamsCollection = {}

        for (const raw of data) {
            const team = TeamsSerializer.serializeTeam(raw)

            collection[team.id] = team
        }

        return collection
    }
}