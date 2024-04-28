import './TeamsDropdown.scss'
import { fetchTeamsBySearch } from '../../api'
import { Team, TeamId } from '../../models'
import SearchableDropdown from './SearchableDropdown'

interface TeamsDropdownProps {
    selectedTeam: Team | 'all' | null
    onChange: (team: Team | 'all' | null) => void
    excludeOptionAll?: boolean
    width?: string | number
    resultsListMaxHeight?: string | number
    disabled?: boolean
}

const TeamsDropdown: React.FC<TeamsDropdownProps> = ({ selectedTeam, onChange, excludeOptionAll, width, resultsListMaxHeight, disabled }) => {
    const queryTeams = async(prompt: string): Promise<(Team | 'all')[]> => {
        const teams = await fetchTeamsBySearch(prompt)
        return (Object.values(teams) as (Team | 'all')[]).concat(!excludeOptionAll && 'all'.includes(prompt.toLocaleLowerCase()) ? ['all'] : [])
    }

    const label = (team: Team | 'all'): string => {
        return team === 'all' ? 'All' : team.fullName
    }

    const key = (team: Team | 'all'): TeamId | 'all' => {
        return team === 'all' ? 'all' : team.id
    }

    const teamElement = (team: Team | 'all'): JSX.Element => {
        const sourceImage = team === 'all' ? 'https://i.logocdn.com/nba/current/nba.svg' : `https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg?imwidth=256&imheight=256`

        return (
            <div className="team-option">
                <img src={sourceImage} loading="lazy"/>
                <span>{label(team)}</span>
            </div>
        )
    }

    return (
        <SearchableDropdown onChange={onChange} selected={selectedTeam} queryCallback={queryTeams} getKeyCallback={key} getLabelCallback={label} getElementCallback={teamElement} loadingElement={<span>Loading...</span>} width={width ?? '250px'} resultsListMaxHeight={resultsListMaxHeight} placeholder="Select a team..." disabled={disabled} uppercase/>
    )
}

export default TeamsDropdown