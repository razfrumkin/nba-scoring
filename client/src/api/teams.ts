import { Team, TeamId, TeamOption, TeamsCollection } from '../models'

const URL = 'api/teams'

export async function fetchTeams<T extends TeamOption>(team: T): Promise<T extends TeamId ? Team : T extends 'all' ? TeamsCollection : never> {
    const response = await fetch(`${URL}/${team}`)
    return response.json()
}

export async function fetchTeamsBySearch(prompt: string): Promise<TeamsCollection> {
    const response = await fetch(`${URL}/search?prompt=${prompt}`)
    return response.json()
}