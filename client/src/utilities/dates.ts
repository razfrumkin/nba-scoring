import { SeasonId } from '../models'

export function yearToSeason(year: number): SeasonId {
    const lastTwoDigits = String(year + 1).slice(-2)
    return `${year}-${lastTwoDigits}`
}

export function currentYear(): number {
    return new Date().getFullYear()
}

export function formatDate(date: Date): string {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedMonth = month < 10 ? `0${month}` : month
    const formattedDay = day < 10 ? `0${day}` : day

    return `${formattedMonth}/${formattedDay}/${year}`
}