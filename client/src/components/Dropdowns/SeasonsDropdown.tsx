import './SeasonsDropdown.scss'
import { SeasonId } from '../../models'
import { getAvailableSeasons, seasonToYear } from '../../utilities'
import SearchableDropdown from './SearchableDropdown'

interface SeasonsDropdownProps {
    selectedSeason: SeasonId | 'all' | null
    onChange: (season: SeasonId | 'all' | null) => void
    excludeOptionAll?: boolean
    width?: string | number
    resultsListMaxHeight?: string | number
    disabled?: boolean
}

const SeasonsDropdown: React.FC<SeasonsDropdownProps> = ({ selectedSeason, onChange, excludeOptionAll, width, resultsListMaxHeight, disabled }) => {
    const querySeasons = async(prompt: string): Promise<(SeasonId | 'all')[]> => {
        const seasons = getAvailableSeasons()

        return ([...seasons].reverse().filter(season => {
            return seasonToYear(prompt) === season.year + 1 || season.id.includes(prompt)
        }).map(season => season.id) as (SeasonId | 'all')[]).concat(!excludeOptionAll && 'all'.includes(prompt.toLowerCase()) ? ['all'] : [])
    }

    const label = (season: SeasonId | 'all'): string => {
        return season === 'all' ? 'All' : season
    }

    const key = (season: SeasonId | 'all'): string => {
        return label(season)
    }

    const seasonElement = (season: SeasonId | 'all'): JSX.Element => {        
        return (
            <div className="season-option">
                <span>{label(season)}</span>
            </div>
        )
    }

    return (
        <SearchableDropdown onChange={onChange} selected={selectedSeason} queryCallback={querySeasons} getKeyCallback={key} getLabelCallback={label} getElementCallback={seasonElement} loadingElement={<span>Loading...</span>} width={width ?? '200px'} resultsListMaxHeight={resultsListMaxHeight} placeholder="Select a season..." disabled={disabled} uppercase/>
    )
}

export default SeasonsDropdown