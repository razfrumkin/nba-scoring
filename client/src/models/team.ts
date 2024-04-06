export type TeamId = number

export type Team = {
    id: TeamId
    fullName: string
    abbreviation: string
    nickname: string
    city: string
    state: string
    colors: string[]
}

export type TeamsCollection = { [teamId: TeamId]: Team }