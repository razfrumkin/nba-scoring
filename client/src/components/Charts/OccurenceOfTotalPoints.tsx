import { BarElement, CategoryScale, Chart, ChartData, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Game, SeasonId } from '../../models'
import { useState } from 'react'
import { useGamesCollection } from '../../hooks'
import { Bar } from 'react-chartjs-2'
import SeasonsDropdown from '../Dropdowns/SeasonsDropdown'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function calculateOccurences(games: Game[]): { [totalPoints: number]: Game[] } {
    const totals: { [totalPoints: number]: Game[] } = {}

    for (const game of games) {
        const total = game.winnerPoints + game.loserPoints
        if (total in totals) totals[total].push(game)
        else totals[total] = [game]
    }

    return totals
}

const OccurenceOfTotalPoints = () => {
    const [season, setSeason] = useState<SeasonId | 'all'>('all')

    const { isLoading, games } = useGamesCollection('all', season, 'none')

    const occurences = calculateOccurences(games ?? [])

    const data: ChartData<'bar'> = {
        labels: Object.keys(occurences),
        datasets: [
            {
                label: 'Total Points',
                data: Object.values(occurences).map(gamesArray => {
                    return gamesArray.length
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.8)'
            }
        ]
    }

    const options: ChartOptions<'bar'> = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: context => {
                        const index = context.dataIndex
                        const totalPoints = Object.keys(occurences)[index]
                        const appearances = occurences[parseInt(totalPoints)].length
                        return `${appearances} appearances`
                    }
                }
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%' }}>
                {isLoading ? <span>Loading...</span> : 
                    <Bar data={data} options={options}/>
                }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default OccurenceOfTotalPoints