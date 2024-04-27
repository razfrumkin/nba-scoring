import { randomId64 } from './id'
import { interpolate } from './math'
import { setOpacity, GREEN, RED } from './colors'
import { yearToSeason, seasonToYear, currentYear, currentSeason, formatDate } from './dates'
import { NBA_START_YEAR, getAvailableSeasons } from './seasons'
import { scoringDifference } from './games'
import { calculateStreaks, calculateDifferentials, calculateAverages, calculateOffenseDefenseAverages, calculateTotalPointsOccurences } from './graphData'

export { randomId64, interpolate, setOpacity, GREEN, RED, yearToSeason, seasonToYear, currentYear, currentSeason, formatDate, NBA_START_YEAR, getAvailableSeasons, scoringDifference, calculateStreaks, calculateDifferentials, calculateAverages, calculateOffenseDefenseAverages, calculateTotalPointsOccurences }