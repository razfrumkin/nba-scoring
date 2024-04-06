import { Team, TeamOption, TeamsCollection } from '../models'

const URL = 'api/teams'

export async function fetchTeams(team: TeamOption): Promise<Team | TeamsCollection> {
    const response = await fetch(`${URL}/${team}`)
    return response.json()
}

export async function fetchTeamsBySearch(prompt: string): Promise<TeamsCollection> {
    const response = await fetch(`${URL}/search?prompt=${prompt}`)
    return response.json()
}