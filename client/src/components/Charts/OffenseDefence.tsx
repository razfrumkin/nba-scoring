import { Chart, ChartData, ChartOptions, LinearScale, PointElement, Tooltip } from 'chart.js'
import SeasonsDropdown from '../Dropdowns/SeasonsDropdown'
import { Scatter } from 'react-chartjs-2'
import { useState } from 'react'
import { GamesCollection, SeasonId, TeamId } from '../../models'
import { useGamesCollection, useTeams } from '../../hooks'
import { setOpacity } from '../../utilities'

Chart.register(LinearScale, PointElement, Tooltip)

function calculateAverages(games: GamesCollection<'team'>): { teamId: TeamId, offense: number, defense: number }[] {
    const averages: { [teamId: TeamId]: { offense: number, defense: number } } = {}

    for (const teamId in games) {
        const id = parseInt(teamId)
        averages[id] = { offense: 0, defense: 0 }

        for (const game of games[teamId]) {
            averages[id].offense += id === game.winnerId ? game.winnerPoints : game.loserPoints
            averages[id].defense += id === game.winnerId ? game.loserPoints : game.winnerPoints
        }
        
        averages[id].offense /= games[teamId].length
        averages[id].defense /= games[teamId].length
    }

    return Object.keys(averages).map(teamId => {
        const id = parseInt(teamId)
        return { teamId: id, offense: averages[id].offense, defense: averages[id].defense }
    })
}

const OffenseDefense = () => {
    const [season, setSeason] = useState<SeasonId | 'all'>('all')
    
    const { isLoading: areTeamsLoading, teams } = useTeams()
    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateAverages(games ?? {})

    const data: ChartData<'scatter'> = {
        datasets: [
            {
                label: 'Teams average offense and defense',
                data: averages.map(value => {
                    return { x: value.offense, y: value.defense }
                }),
                pointBackgroundColor: teams !== undefined ? averages.map(value => {
                    const team = teams[value.teamId]
                    if (team === undefined) return 'gray'
                    return setOpacity(team.colors[0], 0.8)
                }) : '',
                pointRadius: 10
            }
        ]
    }

    const options: ChartOptions<'scatter'> = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => {
                        if (teams === undefined) return ''
                        const index = context.dataIndex
                        const team = teams[averages[index].teamId]
                        const offense = averages[index].offense.toFixed(1)
                        const defense = averages[index].defense.toFixed(1)
                        if (team === undefined) return `Unknown | Offense: ${offense}, defense: ${defense}`
                        return `${team.fullName} | Offense: ${offense}, defense: ${defense}`
                    }
                }
            }
        },
        scales: {
            y: {
                reverse: true
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%' }}>
                {areTeamsLoading || isLoading ? <span>Loading...</span> : 
                    <Scatter data={data} options={options}/>
                }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default OffenseDefense