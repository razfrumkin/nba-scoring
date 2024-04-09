import './TeamsDropdown.scss'
import { fetchTeamsBySearch } from '../../api'
import { Team } from '../../models'
import SearchableDropdown from './SearchableDropdown'

interface TeamsDropdownProps {
    selectedTeam: Team | null
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>
    width?: string | number
    resultsListMaxHeight?: string | number
}

const TeamsDropdown: React.FC<TeamsDropdownProps> = ({ selectedTeam, setSelectedTeam, width, resultsListMaxHeight }) => {
    const queryTeams = async(prompt: string): Promise<Team[]> => {
        const teams = await fetchTeamsBySearch(prompt)

        return Object.values(teams)
    }

    const teamElement = (team: Team): JSX.Element => {
        return (
            <div className="team-option">
                <img src={`https://cdn.nba.com/logos/nba/${team.id}/primary/L/logo.svg?imwidth=256&imheight=256`} loading="lazy"/>
                <span>{team.fullName}</span>
            </div>
        )
    }

    return (
        <SearchableDropdown onChange={team => setSelectedTeam(team)} selected={selectedTeam} queryCallback={queryTeams} getKeyCallback={team => team.id} getLabelCallback={team => team.fullName} getElementCallback={teamElement} loadingElement={<span>Loading...</span>} width={width} resultsListMaxHeight={resultsListMaxHeight} placeholder="Select a team..."/>
    )
}

export default TeamsDropdown