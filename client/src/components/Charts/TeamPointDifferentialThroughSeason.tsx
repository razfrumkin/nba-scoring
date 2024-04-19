import { BarElement, CategoryScale, Chart, ChartData, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Game, SeasonId, Team, TeamId } from '../../models'
import { DEFAULT_TEAM, currentSeason, formatDate } from '../../utilities'
import { useGamesCollection } from '../../hooks'
import { Bar } from 'react-chartjs-2'
import SeasonsDropdown from '../Filter/SeasonsDropdown'
import { TeamsDropdown } from '../Filter'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function calculateDifferentials(teamId: TeamId, games: Game[]): { differential: number, game: Game }[] {
    const differentials: { differential: number, game: Game }[] = []

    for (const game of games) {
        const differential = teamId === game.winnerId ? game.winnerPoints - game.loserPoints : game.loserPoints - game.winnerPoints
        differentials.push({ differential: differential, game: game })
    }

    return differentials
}

const TeamPointDifferentialThroughSeason = () => {
    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const differentials = calculateDifferentials(team.id, games ?? [])

    const GREEN = 'rgba(75, 192, 192, 0.8)'
    const RED = 'rgba(255, 99, 132, 0.8)'

    const data: ChartData<'bar'> = {
        labels: differentials.map(value => {
            return formatDate(new Date(value.game.date))
        }),
        datasets: [
            {
                data: differentials.map(value => {
                    return value.differential
                }),
                backgroundColor: differentials.map(value => {
                    return value.differential > 0 ? GREEN : RED
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
                        const data = differentials[index]
                        if (differentials === undefined) return ''
                        const game = data.game
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `Point differential: ${data.differential} | ${leftPoints}-${rightPoints}, ${matchup}`
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
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll resultsListMaxHeight="100px"/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default TeamPointDifferentialThroughSeason