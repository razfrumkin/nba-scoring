import { SeasonId } from '../models'

export function yearToSeason(year: number): SeasonId {
    const lastTwoDigits = String(year + 1).slice(-2)
    return `${year}-${lastTwoDigits}`
}

export function seasonToYear(season: SeasonId): number {
    const yearString = season.split('-')[0]
    return parseInt(yearString)
}

export function currentSeason(): SeasonId {
    return yearToSeason(currentYear() - 1)
}

export function currentYear(): number {
    return new Date().getFullYear()
}