import { SeasonId } from '../models'
import { currentYear, yearToSeason } from './dates'

export const NBA_START_YEAR = 1946

export function getAvailableSeasons(): { id: SeasonId, year: number }[] {
    return Array.from<SeasonId>({ length: currentYear() - NBA_START_YEAR }).map((_, index) => {
        const year = NBA_START_YEAR + index
        const season = yearToSeason(year)
        return { id: season, year: year }
    })
}