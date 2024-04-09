import './SeasonsDropdown.scss'
import { SeasonId } from '../../models'
import { getAvailableSeasons, seasonToYear } from '../../utilities'
import SearchableDropdown from './SearchableDropdown'

interface SeasonsDropdownProps {
    selectedSeason: SeasonId | null
    setSelectedSeason: React.Dispatch<React.SetStateAction<SeasonId | null>>
    width?: string | number
    resultsListMaxHeight?: string | number
}

const SeasonsDropdown: React.FC<SeasonsDropdownProps> = ({ selectedSeason, setSelectedSeason, width, resultsListMaxHeight }) => {
    const querySeasons = async(prompt: string): Promise<SeasonId[]> => {
        const seasons = getAvailableSeasons()

        return [...seasons].reverse().filter(season => {
            return seasonToYear(prompt) === season.year + 1 || season.id.includes(prompt)
        }).map(season => season.id)
    }

    const seasonElement = (seasonId: SeasonId): JSX.Element => {
        return (
            <div className="season-option">
                <span>{seasonId}</span>
            </div>
        )
    }

    return (
        <SearchableDropdown onChange={season => setSelectedSeason(season)} selected={selectedSeason} queryCallback={querySeasons} getKeyCallback={season => season} getLabelCallback={season => season} getElementCallback={seasonElement} loadingElement={<span>Loading...</span>} width={width} resultsListMaxHeight={resultsListMaxHeight} placeholder="Select a season..."/>
    )
}

export default SeasonsDropdown