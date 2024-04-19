import { Bar } from 'react-chartjs-2'
import SeasonsDropdown from '../Filter/SeasonsDropdown'
import { BarElement, CategoryScale, Chart, ChartData, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { GamesCollection, SeasonId, TeamId } from '../../models'
import { useGamesCollection, useTeams } from '../../hooks'
import { setOpacity } from '../../utilities'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function calculateAverages(games: GamesCollection<'team'>): { teamId: TeamId, average: number }[] {
    const averages: { [teamId: TeamId]: number } = {}

    for (const teamId in games) {
        const id = parseInt(teamId)
        averages[id] = 0
        
        for (const game of games[teamId]) {
            averages[id] += id === game.winnerId ? game.winnerPoints : game.loserPoints
        }

        averages[id] /= games[teamId].length
    }

    return Object.keys(averages).map(teamId => {
        const id = parseInt(teamId)
        return { teamId: id, average: averages[id] }
    }).sort((left, right) => {
        return right.average - left.average
    })
}

const TeamsAveragePoints = () => {
    const [season, setSeason] = useState<SeasonId | 'all'>('all')

    const { isLoading: areTeamsLoading, teams } = useTeams()
    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateAverages(games ?? {})

    const data: ChartData<'bar'> = {
        labels: teams !== undefined ? averages.map(value => {
            const team = teams[value.teamId]
            if (team === undefined) return 'Unknown' // team does not exist anymore (old team)
            return team.abbreviation
        }) : [],
        datasets: [
            {
                label: 'Average Points',
                data:averages.map(value => {
                    return value.average
                }),
                backgroundColor: averages.map(value => {
                    if (teams === undefined) return ''
                    const team = teams[value.teamId]
                    if (team === undefined) return 'rgb(200, 200, 200, 0.8)' // team does not exist anymore (old team)
                    return setOpacity(teams[value.teamId].colors[0], 0.8)
                })
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
                        const average = averages[index].average
                        return `Average points: ${average.toFixed(1)}`
                    }
                }
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%' }}>
                {areTeamsLoading || isLoading ? <span>Loading...</span> : 
                    <Bar data={data} options={options}/>
                }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default TeamsAveragePoints