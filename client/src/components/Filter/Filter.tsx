import './Filter.scss'
import { SeasonId, Team } from '../../models'
import TeamsDropdown from './TeamsDropdown'
import SeasonsDropdown from './SeasonsDropdown'

interface FilterProps {
    season: SeasonId | 'all' | null
    setSeason: React.Dispatch<React.SetStateAction<SeasonId | 'all' | null>>
    team: Team | 'all' | null
    setTeam: React.Dispatch<React.SetStateAction<Team | 'all' | null>>
    width?: string | number
    padding?: string | number
    maxResultsHeight: string | number
}

const Filter: React.FC<FilterProps> = ({ width, padding, maxResultsHeight, season, setSeason, team, setTeam }) => {
    return (
        <div className="filter" style={{ width: width, padding: padding, gap: padding }}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <span>Season</span>
                    <SeasonsDropdown selectedSeason={season} onChange={setSeason} width="100%" resultsListMaxHeight={maxResultsHeight}/>
                </div>
            </div>
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <span>Team</span>
                    <TeamsDropdown selectedTeam={team} onChange={setTeam} width="100%" resultsListMaxHeight={maxResultsHeight}/>
                </div>
            </div>
        </div>
    )
}

export default Filter