import { useContext } from 'react'
import { SeasonId } from '../models'
import { NBAContext } from '../providers/nba/nbaContext'

interface UseSeasonsReturnType {
    currentSeason: SeasonId
}

const useSeasons = (): UseSeasonsReturnType => {
    const context = useContext(NBAContext)
    if (context === null) throw new Error('useSeasons must be within NBAProvider')

    return { currentSeason: context.currentSeason }
}

export default useSeasons